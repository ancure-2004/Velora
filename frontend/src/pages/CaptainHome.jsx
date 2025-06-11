import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import {useGSAP} from "@gsap/React";
import gsap from "gsap";
import {Link} from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePanel from "../components/ConfirmRidePopPanel";
import ConfirmRidePopPanel from "../components/ConfirmRidePopPanel";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext"
import LiveTracking from "../components/LiveTracking";


const CaptainHome = () => {
	
	const [ridePopPanel, setRidePopPanel] = useState(false);
	const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
	const [ride, setRide] = useState(null);

	const ridePopPanelref = useRef(null);
	const confirmRidePopupPanelRef = useRef(null)

	const { socket } = useContext(SocketContext);
	const { captain } = useContext(CaptainDataContext);

	useEffect(() => {
		socket.emit('join', {
			userId: captain._id,
			userType: "captain",
		} )

		const updateLocation = () => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					socket.emit('update-location-captain', {
						userId: captain._id,
						location: {
							ltd: position.coords.latitude,
							lng: position.coords.longitude
						}
					});
				});
			}
		}
		const locationInterval = setInterval(updateLocation, 1000);
		updateLocation();

	})

	socket.on('new-ride', (data) => {
		console.log(data);
		setRide(data);
		setRidePopPanel(true);
	})

	async function confirmRide() {
		console.log("sent")
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
			rideId: ride._id,
			captainId: captain._id,
		},{
			headers: {
				Authorization : `Bearer ${localStorage.getItem("token")}`, 
			}});

		setRidePopPanel(false);
		setConfirmRidePopupPanel(true);
	}

	useGSAP(() => {
		if (ridePopPanel) {
			gsap.to(ridePopPanelref.current, {
				transform: "translateY(0%)",
			});
		} else {
			gsap.to(ridePopPanelref.current, {
				transform: "translateY(100%)",
			});
		}
	}, [ridePopPanel]);

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

	return (
		<div className="h-screen">
			<img className="w-20 absolute left-3 top-3" src="./velora_icon2.png"/>
			<Link
				to="/captain-login"
				className="fixed h-10 w-10 bg-white rounded-full flex items-center justify-center top-3 right-3 z-10"
			>
				<i className="text-violet-700 font-bold ri-logout-box-r-line"></i>
			</Link>
			<div className="h-3/5">
				<LiveTracking />
			</div>

			<div className="h-2/5 p-6">
				<CaptainDetails />
			</div>
			<div ref={ridePopPanelref} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<RidePopUp
					ride = {ride}
					setRidePopPanel={setRidePopPanel}
					setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
					confirmRide = {confirmRide} />
			</div>
			<div ref={confirmRidePopupPanelRef} className="fixed translate-y-full h-screen w-full z-10 bottom-0 py-6 px-3 bg-white">
				<ConfirmRidePopPanel ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel}  setRidePopPanel={setRidePopPanel} />
			</div>
		</div>
	);
};

export default CaptainHome;
