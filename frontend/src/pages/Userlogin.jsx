import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {UserDataContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Userlogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {user, setUser} = useContext(UserDataContext);

	const navigate = useNavigate();

	useEffect(() => {
		console.log("Updated user state:", user);
	}, [user]);

	async function submitHandler(e) {
		e.preventDefault();

		const userData = {
			email: email,
			password: password,
		}

		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

		if (response.status === 200) {
			setUser(response.data);
			localStorage.setItem("token", response.data.token);
			navigate("/home");
		}

		setEmail("");
		setPassword("");
	}

	return (
		<div className="min-h-screen flex flex-col bg-white justify-between p-6">
			<div className="w-full mt-3 max-w-md mx-auto ">
				<div className="flex justify-start justify-center mb-4">
					<img className="w-32" src="/velora_icon2.png" alt="Logo" />
				</div>

				<form
					className="w-full"
					onSubmit={(e) => {
						submitHandler(e);
					}}
				>
					<h3 className="text-xl font-semibold mb-2 mt-2">What's your Email</h3>
					<input
						className="bg-[#f5f5f5] mb-4 rounded-xl px-4 py-2.5 border w-full placeholder:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						placeholder="email@example.com"
						required
					/>

					<h3 className="text-xl font-semibold mb-2 mt-2">Enter Password</h3>
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
						New here?{" "}
						<Link
							to="/user-signup"
							className="text-violet-700 font-semibold hover:underline"
						>
							Create New Account
						</Link>
					</p>

					<Link
						to="/captain-login"
						className="flex items-center justify-center bg-violet-700 hover:bg-violet-900 
                            transition-colors duration-300 text-white 
                            text-lg font-bold w-full py-3 rounded-2xl"
					>
						Sign in as a Captain
					</Link>

					{/* Divider */}
					<div className="flex items-center my-6">
						<div className="flex-grow h-px bg-gray-300"></div>
						<span className="px-4 text-gray-400 text-sm">or</span>
						<div className="flex-grow h-px bg-gray-300"></div>
					</div>

					{/* Social login buttons */}
					{/*             
                          <div className="flex flex-col space-y-4">
                            <button className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl border text-gray-700 hover:bg-gray-100 transition">
                              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                              <span className="font-medium text-sm">Sign in with Google</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl border text-gray-700 hover:bg-gray-100 transition">
                              <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                              <span className="font-medium text-sm">Sign in with Facebook</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl border text-gray-700 hover:bg-gray-100 transition">
                              <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
                              <span className="font-medium text-sm">Sign in with Apple</span>
                            </button>
                          </div>  */}
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

export default Userlogin;
