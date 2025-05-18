import React from "react";

const CaptainDetails = () => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start gap-3">
					<img
						className="h-12 w-12 rounded-full object-cover"
						src="./driverImg.png"
					/>
					<h4 className="text-lg font-semibold">Aman Singhal</h4>
				</div>
				<div>
					<h4 className="text-xl font-semibold">₹295.00</h4>
					<p className="text-sm text-gray-600">Earned</p>
				</div>
			</div>

			<div className="p-3 mt-6 rounded-xl bg-gray-200 flex justify-between items-center">
				<div className="text-center">
					<i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
				<div className="text-center">
					<i className="text-3xl mb-2 font-thin ri-pin-distance-fill"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
				<div className="text-center">
					<i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">Hours Online</p>
				</div>
			</div>
		</div>
	);
};

export default CaptainDetails;
