import { useState } from "react";
import { BookCard } from "../books/BookCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/bookApi";

const categories = [
	"Choose a genre",
	"Business",
	"Horror",
	"Fiction",
	"Adventure",
];

const TopSellers = () => {
	const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

	const { data: books = [], error, isLoading } = useFetchAllBooksQuery();
	console.log(books);
	const filteredBooks =
		selectedCategory === "Choose a genre"
			? books
			: books.filter(
					(book) => book.category === selectedCategory.toLowerCase()
			  );

	return (
		<div className="py-10">
			<h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
			<div className="mb-8 flex items-center">
				<select
					name="category"
					id="category"
					className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					{categories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			<Swiper
				navigation={true}
				modules={[Pagination, Navigation]}
				slidesPerView={1}
				spaceBetween={30}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1480: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				className="mySwiper"
			>
				{filteredBooks.length > 0 &&
					filteredBooks.map((book) => (
						<SwiperSlide key={book._id}>
							<BookCard book={book} />
						</SwiperSlide>
					))}
			</Swiper>

			<div></div>
		</div>
	);
};

export default TopSellers;
