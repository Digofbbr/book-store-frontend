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

const Recommended = () => {
	const {
		data: recommendedBooks = [],
		error,
		isLoading,
	} = useFetchAllBooksQuery();

	return (
		<div className="py-16">
			<h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

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
				{recommendedBooks.length > 0 &&
					recommendedBooks.slice(8, 16).map((book) => (
						<SwiperSlide key={book._id}>
							<BookCard book={book} />
						</SwiperSlide>
					))}
			</Swiper>

			<div></div>
		</div>
	);
};

export default Recommended;
