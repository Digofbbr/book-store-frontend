import React, { useEffect, useState } from "react";
import {
	useUpdateBookMutation,
	useFetchBookByIdQuery,
} from "../../../redux/features/books/bookApi";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";

const UpdateBook = () => {
	const { id } = useParams();

	const [updateBook] = useUpdateBookMutation();
	const [imageFile, setImageFile] = useState(null);
	const [imageFileName, setImageFileName] = useState("");

	const {
		data: bookData,
		isLoading,
		isError,
		refetch,
	} = useFetchBookByIdQuery(id);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	useEffect(() => {
		if (bookData) {
			setValue("title", bookData.title);
			setValue("description", bookData.description);
			setValue("category", bookData.category);
			setValue("trending", bookData.trending);
			setValue("oldPrice", bookData.oldPrice);
			setValue("newPrice", bookData.newPrice);
			setValue("coverImage", bookData.coverImage);
		}
	}, [bookData, setValue]);

	const onSubmit = async (data) => {
		const updateBookData = {
			title: data.title,
			description: data.description,
			category: data.category,
			trending: data.trending,
			oldPrice: Number(data.oldPrice),
			newPrice: Number(data.newPrice),
			coverImage: data.coverImage || bookData.coverImage,
		};

		try {
			await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			await refetch();
			console.log("Book edited");
		} catch (error) {
			console.error(error);
			alert("Failed to edit book");
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImageFileName(file.name);
		}
	};

	if (isLoading) return <Loading />;
	if (isError) return <div>Error fetching data...</div>;

	return (
		<div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

			{/* Form starts here */}
			<form onSubmit={handleSubmit(onSubmit)} className="">
				{/* Reusable Input Field for Title */}
				<InputField
					label="Title"
					name="title"
					placeholder="Enter book title"
					register={register}
				/>

				{/* Reusable Textarea for Description */}
				<InputField
					label="Description"
					name="description"
					placeholder="Enter book description"
					type="textarea"
					register={register}
				/>

				{/* Reusable Select Field for Category */}
				<SelectField
					label="Category"
					name="category"
					options={[
						{ value: "", label: "Choose A Category" },
						{ value: "business", label: "Business" },
						{ value: "technology", label: "Technology" },
						{ value: "fiction", label: "Fiction" },
						{ value: "horror", label: "Horror" },
						{ value: "adventure", label: "Adventure" },
						// Add more options as needed
					]}
					register={register}
				/>

				{/* Trending Checkbox */}
				<div className="mb-4">
					<label className="inline-flex items-center">
						<input
							type="checkbox"
							{...register("trending")}
							className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
						/>
						<span className="ml-2 text-sm font-semibold text-gray-700">
							Trending
						</span>
					</label>
				</div>

				{/* Old Price */}
				<InputField
					label="Old Price"
					name="oldPrice"
					type="number"
					placeholder="Old Price"
					register={register}
				/>

				{/* New Price */}
				<InputField
					label="New Price"
					name="newPrice"
					type="number"
					placeholder="New Price"
					register={register}
				/>

				{/* Cover Image Upload */}
				<div className="mb-4">
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						Cover Image
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="mb-2 w-full"
					/>
					{imageFileName && (
						<p className="text-sm text-gray-500">Selected: {imageFileName}</p>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
				>
					{isLoading ? (
						<span className="">Adding.. </span>
					) : (
						<span>Add Book</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default UpdateBook;
