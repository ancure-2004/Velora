import React, { use, useRef, useState } from "react";
import {useGSAP} from "@gsap/React";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");
	const [panelOpen, setPanelOpen] = useState(false);
	const panelRef = useRef(null);
	const panelCloseRef = useRef(false )

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

	return (
		<div className="h-screen w-screen relative">
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
						<i className="ri-arrow-down-wide-fill"></i>
					</h5>

					<h4 className="text-2xl font-semibold">Let's Start your Trip</h4>
					<form onSubmit={(e) => {submitHandler(e)}}>
						<div className="line absolute h-16 w-1 top-[44%] left-9 bg-gray-500 rounded-full"></div>
						<input
							onClick={() => setPanelOpen(true)}
							value={pickup}
							onChange={(e) => setPickup(e.target.value)}
							className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5"
							type="text"
							placeholder="Enter Pickup Location"
						/>

						<input
							onClick={() => setPanelOpen(true)}
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3"
							type="text"
							placeholder="Enter Drop Location"
						/>
					</form>
				</div>

				<div ref={panelRef} className="bg-white">
					<LocationSearchPanel/>
				</div>
			</div>
		</div>
	);
};

export default Home;
 