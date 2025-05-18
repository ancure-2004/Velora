import React, { useState } from "react";
import {Link} from "react-router-dom";

const ConfirmRidePopPanel = (props) => {

	const [otp, setOtp] = useState("");

	function submitHandler(e) {
		e.preventDefault();
	}

	return (
		<div>
			<h5
				onClick={() => {
					props.setConfirmRidePanel(false);
				}}
				className="p-1 text-center w-[93%] absolute top-0"
			>
				<i className="text-3xl ri-arrow-down-wide-fill text-violet-200"></i>
			</h5>
			<h3 className="text-2xl font-semibold mt-5">Confirm Your Ride</h3>

			<div className="flex justify-between items-center mt-4 p-3 border-2 border-violet-500 rounded-xl">
				<div className="flex items-center gap-3">
					<img className="h-12 w-12 rounded-full" src="driverImg.png" />
					<h2 className="text-lg font-medium">Aman Singhal</h2>
				</div>
				<h2 className="text-xl font-semibold">2.2 KM</h2>
			</div>

			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 p-3 border-b-2 mt-2">
						<i className="text-lg ri-map-pin-3-fill"></i>
						<div>
							<h3 className="text-lg font-medium">204-GF/ sector - 7</h3>
							<p className="text-sm -mt-1 color=grey-600">
								Wave City, Ghaziabad NH-24
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 p-3 border-b-2 mt-2 ">
						<i className="text-lg ri-map-pin-4-fill"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">204-GF/ sector - 7</h3>
							<p className="text-sm -mt-1 color=grey-600">
								Wave City, Ghaziabad NH-24
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3 mt-2">
						<i className="text-lg ri-currency-line"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">200.00</h3>
							<p className="text-sm -mt-1 color=grey-600">Cash Cash</p>
						</div>
					</div>
				</div>
				<div className="w-full mt-6 p-4">
					<form
						onSubmit={(e) => {
							submitHandler(e);
						}}
					>
						<input
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="bg-[#f5f5f5] mb-4 rounded-xl px-6 py-4 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="Number" placeholder="Enter OTP" />
						<div className="w-full flex gap-2 justify-between items-center mt-3">
							<Link
								to="/captain-riding"
								className="flex justify-center items-center bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl"
							>
								Confirm
							</Link>
							<button
								onClick={() => {
									props.setRidePopPanel(false);
									props.setConfirmRidePanel(false);
								}}
								className="bg-red-500 hover:bg-gray-500 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ConfirmRidePopPanel;
