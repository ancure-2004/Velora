import React from "react";

const LookingForDriver = (props) => {
	return (
		<div>
			<h3 className="text-2xl font-semibold">Looking For Driver</h3>
			<div className="flex gap-2 justify-between flex-col items-center">
				<img className="w-[70%] " src="CarImage1.png" />
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 p-3 border-b-2 ">
						<i className="text-lg ri-map-pin-3-fill"></i>
						<div>
							<h3 className="text-lg font-medium">204-GF/ sector - 7</h3>
							<p className="text-sm -mt-1 color=grey-600">
								Wave City, Ghaziabad NH-24
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3 border-b-2 ">
						<i className="text-lg ri-map-pin-4-fill"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">204-GF/ sector - 7</h3>
							<p className="text-sm -mt-1 color=grey-600">
								Wave City, Ghaziabad NH-24
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3">
						<i className="text-lg ri-currency-line"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">200.00</h3>
							<p className="text-sm -mt-1 color=grey-600">Cash Cash</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						props.setVehicleFound(false);
					}}
					className="text-red-600 hover:text-red-800 transition-colors duration-300 text-base w-full"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default LookingForDriver;
