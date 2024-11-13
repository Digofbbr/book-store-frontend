import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

export const AdminLogin = () => {
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const response = await axios.post(
				`${getBaseUrl()}/api/auth/admin`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const auth = await response.data;

			console.log(auth);

			if (auth.token) {
				localStorage.setItem("token", auth.token);
				setTimeout(() => {
					localStorage.removeItem("token");
					alert("Token has been expired, please login again");
					navigate("/");
				}, 3600 * 1000);
			}

			alert("Admin Login Successful");
			navigate("/dashboard");
		} catch (error) {
			setMessage("Please provide a valid email and password.");
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold"
							htmlFor="username"
						>
							Username
						</label>
						<input
							{...register("username", { required: true })}
							type="text"
							name="username"
							id="username"
							placeholder="username"
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
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
