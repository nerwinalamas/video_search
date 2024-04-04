import React, { useState } from "react";
import axios from "axios";

const Navbar = ({ setVideos }) => {
	const [searchVideo, setSearchVideo] = useState("");
	const [searchVideoError, setSearchVideoError] = useState("");

	const LINK = "https://www.googleapis.com/youtube/v3/search";
	// const API_KEY = "AIzaSyBjTqmW9yLzjJeeTIKWjO3d64xP4bB2jXw";
	const API_KEY = "AIzaSyBhyytuLDYVVs7QQDuGyp3cg70OO8AQkAw";

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!searchVideo) {
			setSearchVideoError("Search field cannot be empty!");
			return;
		}

		try {
			const response = await axios.get(
				`${LINK}?part=snippet&q=${searchVideo}&key=${API_KEY}&maxResults=10`
			);
			setVideos(response.data.items);
		} catch (error) {
			console.error("Error fetching videos:", error);
		}
	};

	return (
		<nav className="flex flex-col justify-between gap-5 xl:w-[949px] md:flex-row md:gap-10">
			<h1 className="text-3xl text-red-700 font-semibold xl:text-4xl">
				<span className="text-customWhite">V88</span>
				tube
			</h1>
			<form onSubmit={handleSubmit} className="w-full flex gap-5 md:w-96">
				<input
					type="text"
					name="search"
					id="search"
					className="w-full px-3 py-2 rounded-md text-customBlack"
					value={searchVideo}
					onChange={(e) => {
						setSearchVideo(e.target.value);
						setSearchVideoError("");
					}}
				/>
				<input
					type="submit"
					value="search"
					name="submit"
					className="w-max bg-red-700 text-customWhite py-2 px-3 rounded-md cursor-pointer"
				/>
			</form>
			{searchVideoError && (
				<p className="text-xs text-red-500 font-bold">
					{searchVideoError}
				</p>
			)}
		</nav>
	);
};

export default Navbar;