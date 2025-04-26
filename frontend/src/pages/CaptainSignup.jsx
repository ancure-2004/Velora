import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [captainData, setCaptainData] = useState({})
    
        function submitHandler(e) {
            e.preventDefault();
    
            setCaptainData({
                fullName: {
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password
            })
    
            console.log(captainData)
    
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
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

					<button className="bg-velora-light hover:bg-velora-dark transition-colors duration-300 text-white text-lg font-bold w-full py-3 rounded-2xl">
						Login
					</button>
				</form>

				<div className="text-center mt-5 space-y-6">
					<p className="text-sm">
						Already have an account?{" "}
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
				<p className="text-[10px]">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" className="text-violet-700 font-semibold hover:underline">Privacy Policy</a> and{" "}
                    <a href="https://policies.google.com/terms" className="text-violet-700 font-semibold hover:underline">Terms of Service</a> apply.
				</p>
			</div>
		</div>
	);
};

export default CaptainSignup;
