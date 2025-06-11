import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

	const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

  return (
    <div>
			<h5
				onClick={() => {
                    props.setFinishRidePanel(false);
				}}
				className="p-1 text-center w-[93%] absolute top-0"
			>
				<i className="text-3xl ri-arrow-down-wide-fill text-violet-200"></i>
			</h5>
			<h3 className="text-2xl font-semibold mt-5">Complete the Ride</h3>

			<div className="flex justify-between items-center mt-4 p-3 border-2 border-violet-500 rounded-xl">
				<div className="flex items-center gap-3">
					<img className="h-12 w-12 rounded-full" src="driverImg.png" />
					<h2 className="text-lg font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
				</div>
			</div>

			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 p-3 border-b-2 mt-2">
						<i className="text-lg ri-map-pin-3-fill"></i>
						<div>
							<p className="text-sm -mt-1 color=grey-600">
								{props.ride?.pickup}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-5 p-3 border-b-2 mt-2 ">
						<i className="text-lg ri-map-pin-4-fill"></i>{" "}
						<div>
							<p className="text-sm -mt-1 color=grey-600">
								{props.ride?.dropoff}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-5 p-3 mt-2">
						<i className="text-lg ri-currency-line"></i>{" "}
						<div>
							<h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
							<p className="text-sm -mt-1 color=grey-600">Cash Cash</p>
						</div>
					</div>
				</div>
				<div className="w-full mt-6 p-4">
						<div className="w-full flex gap-2 justify-between items-center mt-10">
							<button
								onClick={endRide}
								className="flex justify-center items-center bg-green-600 hover:bg-green-800 transition-colors duration-300 text-white text-lg font-bold w-full p-3 rounded-2xl"
							>
								Finish Ride
							</button>
						</div>
				</div>
			</div>
		</div>
  )
}

export default FinishRide
