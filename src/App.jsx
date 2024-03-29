import React, { useEffect, useState } from "react";
import axios from "axios";
import RelatedVideos from "./components/RelatedVideos";
import CommentSection from "./components/CommentSection";

function App() {
	const [videos, setVideos] = useState([]);
	const [searchVideo, setSearchVideo] = useState("");
	const [videoData, setVideoData] = useState({});
	const [selectedVideoId, setSelectedVideoId] = useState("");
	const [comment, setComment] = useState("");
	const [commentData, setCommentData] = useState([]);
	const [commentError, setCommentError] = useState("");
	const [searchVideoError, setSearchVideoError] = useState("");

	const LINK = "https://www.googleapis.com/youtube/v3/search";
	// const API_KEY = "AIzaSyBjTqmW9yLzjJeeTIKWjO3d64xP4bB2jXw";
	const API_KEY = "AIzaSyBhyytuLDYVVs7QQDuGyp3cg70OO8AQkAw";

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`${LINK}?part=snippet&key=${API_KEY}&maxResults=10`
			);
			setVideos(response.data.items);
		};
		fetchData();

		const existingComments =
			JSON.parse(localStorage.getItem("comments")) || [];
		setCommentData(existingComments);
	}, []);

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

	const handleVideoClick = (videoId) => {
		setSelectedVideoId(videoId);

		const selectedVideo = videos.find(
			(video) => video.id.videoId === videoId
		);

		const videoComments = commentData.filter(
			(comment) => comment.videoId === videoId
		);

		if (selectedVideo) {
			setVideoData(selectedVideo.snippet);
			setCommentData(videoComments);
		}
	};

	useEffect(() => {
		const videoComments = commentData.filter(
			(comment) => comment.videoId === selectedVideoId
		);
		setCommentData(videoComments);
	}, [selectedVideoId]);

	const handleSubmitComment = (e) => {
		e.preventDefault();
		let valid = true;

		if (!comment) {
			setCommentError("Please fill up the required field.");
			valid = false;
		}

		if (valid) {
			const newComment = {
				id: new Date(),
				message: comment.trim(),
				likes: 0,
				dislikes: 0,
				videoId: selectedVideoId,
			};

			const existingComments =
				JSON.parse(localStorage.getItem("comments")) || [];
			const updatedComments = [...existingComments, newComment];
			localStorage.setItem("comments", JSON.stringify(updatedComments));
			setCommentData(updatedComments);
			setComment("");
		}
	};

	const handleReactToComment = (commentId, reaction) => {
		const updatedComments = commentData.map((comment) => {
			if (comment.id === commentId) {
				if (reaction === "like") {
					return { ...comment, likes: comment.likes + 1 };
				} else if (reaction === "dislike") {
					return { ...comment, dislikes: comment.dislikes + 1 };
				}
			}
			return comment;
		});
		setCommentData(updatedComments);
		localStorage.setItem("comments", JSON.stringify(updatedComments));
	};

	return (
		<main className="w-screen h-screen px-5 pt-5 pb-10 font-poppins bg-customBlack text-customWhite md:w-full xl:h-auto">
			<nav className="flex items-center gap-5 xl:w-[949px] md:gap-10">
				<h1 className="text-3xl font-bold xl:text-5xl">YT</h1>
				<form
					onSubmit={handleSubmit}
					className="w-full flex gap-5 md:w-96"
				>
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
						className="w-max bg-customWhite text-customBlack py-2 px-1 rounded-md font-semibold cursor-pointer"
					/>
				</form>
				{searchVideoError && (
					<p className="text-xs text-red-500 font-bold">
						{searchVideoError}
					</p>
				)}
			</nav>
			<section className="flex flex-col mt-5 gap-10 xl:flex-row">
				{/* VIDEO */}
				<div className="flex flex-col gap-3 md:gap-5">
					<iframe
						src={`https://www.youtube.com/embed/${selectedVideoId}`}
						title={videoData.title}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
						className="w-full h-60 object-contain md:h-96 lg:h-[500px] xl:w-[949px] xl:h-[534px]"
					></iframe>
					<div className="flex flex-col gap-5 border p-5 rounded-md xl:w-[949px]">
						<h2 className="text-2xl font-bold">
							{videoData.title}
						</h2>
						<p className="text-gray-500">{videoData.description}</p>
					</div>
				</div>
				{/* RELATED VID */}
				<RelatedVideos
					videos={videos}
					handleVideoClick={handleVideoClick}
				/>
			</section>
			{/* COMMENT SECTION */}
			<CommentSection
				handleSubmitComment={handleSubmitComment}
                comment={comment}
				setComment={setComment}
				setCommentError={setCommentError}
				commentError={commentError}
				commentData={commentData}
				handleReactToComment={handleReactToComment}
			/>
		</main>
	);
}

export default App;
