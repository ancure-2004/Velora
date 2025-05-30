import React, { use, useRef, useState } from "react";
import {useGSAP} from "@gsap/React";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");
	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
	const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
	const [vehicleFound, setVehicleFound] = useState(false)
	const [waitingForDriver, setWaitingForDriver] = useState(false)

	const panelRef = useRef(null);
	const panelCloseRef = useRef(false )
	const vehiclePanelRef = useRef(null)
	const ConfirmRidePanelRef = useRef(null)
	const VehicleFoundRef = useRef(null)
	const WaitingForDriverRef = useRef(null)

	function submitHandler(e) {
		e.preventDefualt()
	}

	useGSAP(() => {
		if(panelOpen) {
			gsap.to(panelRef.current, {
				height: "70%",
				padding: 20
			})
			gsap.to(panelCloseRef.current, {
				opacity: 1,
			})
		}else{
			gsap.to(panelRef.current, {
				height: "0%",
				padding: 0
			})
			gsap.to(panelCloseRef.current, {
				opacity: 0,
			})
		}
	},[panelOpen])

	useGSAP(() => {
		if(vehiclePanelOpen) {
			gsap.to(vehiclePanelRef.current, {
				transform: "translateY(0%)",
			})
		}else{
			gsap.to(vehiclePanelRef.current, {
				transform: "translateY(100%)",
			})
		}
	},[vehiclePanelOpen])

	useGSAP(() => {
		if(confirmedRidePanel) {
			gsap.to(ConfirmRidePanelRef.current, {
				transform: "translateY(0%)",
			})
		}else{
			gsap.to(ConfirmRidePanelRef.current, {
				transform: "translateY(100%)",
			})
		}
	},[confirmedRidePanel])

	useGSAP(() => {
		if(vehicleFound) {
			gsap.to(VehicleFoundRef.current, {
				transform: "translateY(0%)",
			})
		}else{
			gsap.to(VehicleFoundRef.current, {
				transform: "translateY(100%)",
			})
		}
	},[vehicleFound])

	useGSAP(() => {
		if(waitingForDriver) {
			gsap.to(WaitingForDriverRef.current, {
				transform: "translateY(0%)",
			})
		}else{
			gsap.to(WaitingForDriverRef.current, {
				transform: "translateY(100%)",
			})
		}
	},[waitingForDriver])


	return (
		<div className="h-screen w-screen relative overflow-hidden">
			<img className="w-40 absolute left-3 top-3" src="./velora_icon2.png"/>
			<div className="h-screen w-screen">
				<img className="h-full w-full object-cover" src="temporary_map.png"/>
			</div>
			
			<div className="flex flex-col justify-end h-screen absolute top-0 w-full">
				<div className="h-[30%] bg-white p-6 relative">
					<h5 
						ref={panelCloseRef}
						onClick={() =>setPanelOpen(false)}
						className="absolute top-6 right-6 text-2xl opacity-0">
						<i className="ri-arrow-down-wide-fill text-violet-500"></i>
					</h5>

					<h4 className="text-2xl font-semibold">Let's Start your Trip</h4>
					<form onSubmit={(e) => {submitHandler(e)}}>
						<div className="line absolute h-16 w-1 top-[47%] left-9 bg-gray-500 rounded-full"></div>
						<input
							onClick={() => setPanelOpen(true)}
							value={pickup}
							onChange={(e) => setPickup(e.target.value)}
							className="bg-[#f5f5f5] mt-5 rounded-xl px-8 py-2 border w-full text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							placeholder="Enter Pickup Location"
						/>

						<input
							onClick={() => setPanelOpen(true)}
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							className="bg-[#f5f5f5] mt-5 rounded-xl px-8 py-2 border w-full text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							placeholder="Enter Drop Location"
						/>
					</form>
				</div>

				<div ref={panelRef} className="bg-white">
					<LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
				</div>
			</div>

			<div ref={vehiclePanelRef} className="fixed translate-y-full w-full z-10 bottom-0 py-10 px-3 bg-white">
				<VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
			</div> 
			<div ref={ConfirmRidePanelRef} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound}/>
			</div> 
			<div ref={VehicleFoundRef} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<LookingForDriver setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound}/>
			</div>
			<div ref={WaitingForDriverRef} className="fixed translate-y-full w-full z-10 bottom-0 py-6 px-3 bg-white">
				<WaitingForDriver  waitingForDriver={waitingForDriver}/>
			</div>
		</div>
	);
};

export default Home;
 