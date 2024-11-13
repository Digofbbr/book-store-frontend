import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const Register = () => {
	const [message, setMessage] = useState("");
	const { registerUser, signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			await registerUser(data.email, data.password);
			alert("User registered successfully");
		} catch (error) {
			setMessage("Please provide a valid email and password.");
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle();
			alert("Login Successful");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="h-[calc(100vh-120px)] flex justify-center items-center">
			<div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl font-semibold mb-4">Please Register</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold"
							htmlFor="Email"
						>
							Email
						</label>
						<input
							{...register("email", { required: true })}
							type="text"
							name="email"
							id="email"
							placeholder="email@email.com"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold"
							htmlFor="password"
						>
							Password
						</label>
						<input
							{...register("password", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
							type="password"
							name="password"
							id="password"
						/>
					</div>
					{message && (
						<p className="text-red-500 italic text-xs mb-3">{message}</p>
					)}
					<div>
						<button className="bg-blue-500 hover:bg-blue-700 text-right font-bold py-2 px-8 rounded focus:outline-none text-white">
							Sign Up
						</button>
					</div>
				</form>
				<p className="align-baseline font-medium mt-4 text-sm">
					Have an account? Please
					<Link to="/login">
						<span className="text-blue-500 underline hover:text-blue-700">
							Login
						</span>
					</Link>
				</p>

				<div className="mt-4">
					<button
						onClick={handleGoogleSignIn}
						className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 rounded px-4 focus:outline-none"
					>
						<FaGoogle className="mr-2" />
						Sign in with Google
					</button>
				</div>
				<p className="mt-5 text-center text-gray-500 text-xs">
					©2025 Book Sotre. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Register;
