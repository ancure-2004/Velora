import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
	const location = useLocation();
	const rideData = location.state?.ride

    useGSAP(() => {
		if (finishRidePanel) {
			gsap.to(finishRidePanelRef.current, {
				transform: "translateY(0%)",
			});
		} else {
			gsap.to(finishRidePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [finishRidePanel]);

	return (
		<div className="h-screen w-full">
			<img className="w-20 absolute left-3 top-3" src="./velora_icon2.png" />
			<Link
				to="/captain-login"
				className="fixed h-10 w-10 bg-white rounded-full flex items-center justify-center top-3 right-3 z-10"
			>
				<i className="text-violet-700 font-bold ri-logout-box-r-line"></i>
			</Link>
			<div className="h-4/5">
				<LiveTracking />
			</div>

			<div
                onClick={() => {
                    setFinishRidePanel(true);
                }}
                className="w-full relative h-1/5 p-6 bg-violet-500 rounded-t-3xl flex justify-between items-center">
				<h5
					onClick={() => {
					}}
					className="p-1 text-center w-[83%] absolute top-0"
				>
					<i className="text-3xl ri-arrow-up-wide-fill text-white"></i>
				</h5>
                <h4 className="text-xl font-semibold">4KM Away</h4>
                <button
                    onClick={() => {
                        setFinishRidePanel(true);
                    }}
                    className="bg-gray-300 hover:bg-gray-900 transition-colors duration-300 text-gray-700 text-lg font-bold px-6 py-4 rounded-2xl"
                >
                    Complete Ride
                </button>
			</div>
            <div ref={finishRidePanelRef} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
			</div>
		</div>
	);
};

export default CaptainRiding;
