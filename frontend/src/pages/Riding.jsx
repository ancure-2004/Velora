import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./Home";
import {useEffect, useContext} from "react";
import {SocketContext} from "../context/SocketContext";
import { useNavigate } from 'react-router-dom'
import LiveTracking from "../components/LiveTracking";


const Riding = () => {

	const location = useLocation();
	const { ride } = location.state || {} 
	const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

	return (
		<div className="h-screen">
            <Link to='/home' className="fixed h-10 w-10 bg-white rounded-full flex items-center justify-center top-3 right-3 z-10">
                <i className="text-violet-700 font-bold ri-home-5-line"></i>
            </Link>
			<div className="h-1/2">
				<LiveTracking />
			</div>

			<div className="h-1/2 p-4">
					<div className="flex items-center justify-between">
						<img className="h-20" src="./CarImage1.png" />
						<div className="text-right">
							<h2 className="text-lg font-medium capitalize">{ride?.captain.fullName.firstName + " " + ride?.captain.fullName.lastName}</h2>
							<h4 className="text-xl font-semibold -mt-1 -mb-1">
								{ride?.captain.vehicle.plate}
							</h4>
							<p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
						</div>
					</div>

					<div className="flex gap-2 justify-between flex-col items-center">
						<div className="w-full mt-5">
							<div className="flex items-center gap-5 p-3 border-b-2 ">
								<i className="text-lg ri-map-pin-4-fill"></i>{" "}
								<div>
									<p className="text-sm -mt-1 color=grey-600">
										{ride?.dropoff}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-5 p-3">
								<i className="text-lg ri-currency-line"></i>{" "}
								<div>
									<h3 className="text-lg font-medium">₹{ride?.fare}</h3>
									<p className="text-sm -mt-1 color=grey-600">Cash Cash</p>
								</div>
							</div>
						</div>
					</div>
				<button className="bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl">
					Make Payment
				</button>
			</div>
		</div>
	);
};

export default Riding;
