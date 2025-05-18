import React, { useRef, useState } from "react";
import {useGSAP} from "@gsap/React";
import gsap from "gsap";
import {Link} from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePanel from "../components/ConfirmRidePopPanel";
import ConfirmRidePopPanel from "../components/ConfirmRidePopPanel";

const CaptainHome = () => {
	
	const [ridePopPanel, setRidePopPanel] = useState(true);
	const [confirmRidePanel, setConfirmRidePanel] = useState(false);

	const ridePopPanelref = useRef(null);
	const ConfirmRidePanelRef = useRef(null);

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

	useGSAP(() => {
		if (confirmRidePanel) {
			gsap.to(ConfirmRidePanelRef.current, {
				transform: "translateY(0%)",
			});
		} else {
			gsap.to(ConfirmRidePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [confirmRidePanel]);

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
				<img className="h-full w-full object-cover" src="temporary_map.png" />
			</div>

			<div className="h-2/5 p-6">
				<CaptainDetails />
			</div>
			<div ref={ridePopPanelref} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<RidePopUp setRidePopPanel={setRidePopPanel} setConfirmRidePanel={setConfirmRidePanel} />
			</div>
			<div ref={ConfirmRidePanelRef} className="fixed translate-y-full h-screen w-full z-10 bottom-0 py-6 px-3 bg-white">
				<ConfirmRidePopPanel setConfirmRidePanel={setConfirmRidePanel} setRidePopPanel={setRidePopPanel} />
			</div>
		</div>
	);
};

export default CaptainHome;
