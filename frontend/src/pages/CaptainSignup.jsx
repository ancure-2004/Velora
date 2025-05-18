import React, {useState} from "react";
import {Link} from "react-router-dom";
import CaptainContext, {CaptainDataContext} from "../context/CaptainContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CaptainSignup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [vehicleColor, setVehicleColor] = useState("");
	const [vehiclePlate, setVehiclePlate] = useState("");
	const [vehicleCapacity, setVehicleCapacity] = useState("");
	const [vehicleType, setVehicleType] = useState("");

	const navigate = useNavigate();
	const {captain, setCaptain} = React.useContext(CaptainDataContext);

	async function submitHandler(e) {
		e.preventDefault();

		const CaptainData = {
			fullName: {
				firstName: firstName,
				lastName: lastName,
			},
			email: email,
			password: password,
			vehicle: {
				plate: vehiclePlate,
				color: vehicleColor,
				capacity: vehicleCapacity,
				vehicleType: vehicleType,
			},
		};

		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}/captains/register`,
			CaptainData
		);

		if (response.status === 201) {
			const data = response.data;
			setCaptain(data.captain);
			localStorage.setItem("token", data.token);
			navigate("/captain-home");
		}

		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setVehicleColor("");
		setVehiclePlate("");
		setVehicleCapacity("");
		setVehicleType("");
	}

	return (
		<div className="min-h-screen flex flex-col justify-between bg-white p-6">
			<div className="w-full mt-3 max-w-md mx-auto ">
				<div className="flex justify-start justify-center">
					<img className="w-32" src="/velora_icon2.png" alt="Logo" />
				</div>
				<form
					className="w-full"
					onSubmit={(e) => {
						submitHandler(e);
					}}
				>
					<h3 className="text-base font-semibold mb-2 mt-2">
						What's your Name
					</h3>
					<div className="flex gap-4 mb-4">
						<input
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-1/2 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							placeholder="first name"
							required
						/>

						<input
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-1/2 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							placeholder="last name"
							required
						/>
					</div>

					<h3 className="text-base font-semibold mb-2 mt-2">
						What's your Email
					</h3>
					<input
						className="bg-[#f5f5f5] mb-4 rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="email@example.com"
						required
					/>

					<h3 className="text-base font-semibold mb-2 mt-2">Enter Password</h3>
					<input
						className="bg-[#f5f5f5] mb-4 rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="password"
						required
					/>

					<h3 className="text-base font-semibold mb-2 mt-2">
						Vehicle Information
					</h3>
					<div className="flex gap-4 mb-4">
						<input
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							value={vehiclePlate}
							onChange={(e) => setVehiclePlate(e.target.value)}
							placeholder="Plate Number"
							required
						/>
						<input
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="text"
							value={vehicleColor}
							onChange={(e) => setVehicleColor(e.target.value)}
							placeholder="Vehicle Color"
							required
						/>
					</div>
					<div className="flex gap-4 mb-4">
						<input
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							type="number"
							value={vehicleCapacity}
							onChange={(e) => setVehicleCapacity(e.target.value)}
							placeholder="Seating Capacity"
							required
						/>

						<select
							className="bg-[#f5f5f5] rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
							value={vehicleType}
							onChange={(e) => setVehicleType(e.target.value)}
							required
						>
							<option value="">Select Type</option>
							<option value="car">car</option>
							<option value="bike">bike</option>
							<option value="auto">Auto</option>
						</select>
					</div>

					<button className="bg-velora-light hover:bg-velora-dark transition-colors duration-300 text-white text-lg font-bold w-full py-3 rounded-2xl">
						Register as Captain
					</button>
				</form>

				<div className="text-center mt-2 space-y-6">
					<p className="text-sm">
						Already register as Captain?{" "}
						<Link
							to="/captain-login"
							className="text-violet-700 font-semibold hover:underline"
						>
							Login here
						</Link>
					</p>
				</div>
			</div>
			<div>
				<p className="text-[10px] mt-8">
					This site is protected by reCAPTCHA and the Google{" "}
					<a
						href="https://policies.google.com/privacy"
						className="text-violet-700 font-semibold hover:underline"
					>
						Privacy Policy
					</a>{" "}
					and{" "}
					<a
						href="https://policies.google.com/terms"
						className="text-violet-700 font-semibold hover:underline"
					>
						Terms of Service
					</a>{" "}
					apply.
				</p>
			</div>
		</div>
	);
};

export default CaptainSignup;
