import React from "react";

const VehiclePanel = (props) => {

	return (
		<div>
			<h5
				onClick={() => {
					props.setVehiclePanelOpen(false);
				}}
				className="p-1 text-center w-[93%] absolute top-0"
			>
				<i className="text-3xl ri-arrow-down-wide-fill text-violet-200"></i>
			</h5>
			<h3 className="text-2xl font-semibold mb-5">Choose Your Ride</h3>
			<div onClick={() => {
                props.setConfirmedRidePanel(true);
				props.setVehicleType('car');
            }} className="mb-2 w-full flex items-center justify-between p-3 border-2 border-white active:border-violet-500 rounded-xl">
				<img className="h-12" src="CarImage1.png" />
				<div className="ml-2 w-1/2">
					<h4 className="font-bold text-lg">
						Uber Go{" "}
						<span>
							<i className="ri-user-fill"></i>4
						</span>
					</h4>
					<h5 className="font-medium text-sm">7 mins Away</h5>
					<p className="font-medium text-xs text-gray-600">
						Affordable, Compact Rides
					</p>
				</div>
				<h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
			</div>

			<div onClick={() => {
                props.setConfirmedRidePanel(true);
				props.setVehicleType('bike');
            }} className="mb-2 w-full flex items-center justify-between p-3 border-2 border-white active:border-violet-500 rounded-xl">
				<img className="h-12" src="bikeImage.webp" />
				<div className="ml-2 w-1/2">
					<h4 className="font-bold text-lg">
						Moto{" "}
						<span>
							<i className="ri-user-fill"></i>1
						</span>
					</h4>
					<h5 className="font-medium text-sm">5 mins Away</h5>
					<p className="font-medium text-xs text-gray-600">
						Affordable, Motor Rides
					</p>
				</div>
				<h2 className="text-lg font-semibold">₹{props.fare.bike}</h2>
			</div>

			<div onClick={() => {
                props.setConfirmedRidePanel(true);
				props.setVehicleType('auto');
            }} className="mb-2 w-full flex items-center justify-between p-3 border-2 border-white active:border-violet-500 rounded-xl">
				<img className="h-12" src="autoImage.webp" />
				<div className="ml-2 w-1/2">
					<h4 className="font-bold text-lg">
						Auto{" "}
						<span>
							<i className="ri-user-fill"></i>3
						</span>
					</h4>
					<h5 className="font-medium text-sm">10 mins Away</h5>
					<p className="font-medium text-xs text-gray-600">
						Affordable, Auto Rides
					</p>
				</div>
				<h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
			</div>
		</div>
	);
};

export default VehiclePanel;
