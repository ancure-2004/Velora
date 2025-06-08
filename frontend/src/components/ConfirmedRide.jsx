import React from "react";

const ConfirmedRide = (props) => {
	return (
		<div>
			<h5
				onClick={() => {
					props.setConfirmedRidePanel(false);
				}}
				className="p-1 text-center w-[93%] absolute top-0"
			>
				<i className="text-3xl ri-arrow-down-wide-fill text-violet-200"></i>
			</h5>

			<h3 className="text-xl font-semibold mt-1">Confirm Your Ride</h3>
			<div className="flex gap-2 justify-between flex-col items-center">
				<img className="w-[70%] " src="CarImage1.png" />
				<div className="w-full mt-3">
					<div className="flex items-center gap-5 p-3 border-b-2 ">
						<i className="text-lg ri-map-pin-3-fill"></i>
						<div>
							{/* <h3 className="text-lg font-medium">204-GF/ sector - 7</h3> */}
							<p className="text-sm -mt-1 color=grey-600">
								{props.pickup}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3 border-b-2 ">
						<i className="text-lg ri-map-pin-4-fill"></i>{" "}
						<div>
							{/* <h3 className="text-lg font-medium">204-GF/ sector - 7</h3> */}
							<p className="text-sm -mt-1 color=grey-600">
								{props.destination}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3">
						<i className="text-lg ri-currency-line"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
							<p className="text-sm -mt-1 color=grey-600">Cash Cash</p>
						</div>
					</div>
				</div>
				<button
          onClick={() => {
            props.setConfirmedRidePanel(false);
            props.setVehicleFound(true);
			props.createRide();
          }}
          className="bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl">
					Confirm
				</button>
			</div>
		</div>
	);
};

export default ConfirmedRide;
