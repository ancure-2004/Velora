import React from "react";

const RidePopUp = (props) => {
	return (
		<div>
			<h3 className="text-2xl font-semibold">New Ride Available!</h3>

            <div className="flex justify-between items-center mt-4 p-3 bg-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full" src="driverImg.png"/>
                    <h2 className="text-lg font-medium">Aman Singhal</h2>
                </div>
                <h2 className="text-xl font-semibold">2.2 KM</h2>
            </div>

			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
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
				<div className="w-full flex gap-2 justify-between items-center">
					<button
						onClick={() => {
                            props.setConfirmRidePanel(true);
						}}
						className="bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl"
					>
						Accept
					</button>
					<button
						onClick={() => {
                            props.setRidePopPanel(false);
						}}
						className="bg-gray-300 hover:bg-gray-900 transition-colors duration-300 text-gray-700 text-lg font-bold w-full p-3 rounded-2xl"
					>
						Ignore
					</button>
				</div>
			</div>
		</div>
	);
};

export default RidePopUp;
