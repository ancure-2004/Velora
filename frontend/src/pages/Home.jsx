import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<div
				className="h-screen flex justify-between flex-col w-full bg-violet-400 bg-cover bg-left
                bg-[url(https://img.freepik.com/free-photo/driving-car-night-woman-driving-her-modern-car-night-city_169016-51648.jpg?t=st=1745660465~exp=1745664065~hmac=a07a8c39ae0d7a2bef131cc6ae32375e3f7558454e2db1ae7991eb71349038e3&w=740)]"
			>
				<img
					className="w-20 ml-3 mt-5 drop-shadow-lg brightness-110 contrast-125"
					src="/velora_icon.png"
				/>
				<div className="bg-white pb-7 py-4 px-4 rounded-2xl shadow-lg">
					<h2 className="text-2xl font-bold">Get Started with Velora</h2>
					<Link to='/user-login' className="flex items-center justify-center bg-velora-light hover:bg-velora-dark text-white text-2xl font-bold w-full text-white py-3 rounded-2xl mt-5">
						Continue
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
