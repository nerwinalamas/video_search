import React, { useEffect, useState } from "react";
import axios from "axios";
import RelatedVideos from "./components/RelatedVideos";
import CommentSection from "./components/CommentSection";
import Video from "./components/Video";
import Navbar from "./components/Navbar";

const LINK = import.meta.env.VITE_LINK;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
	const [videos, setVideos] = useState([]);
	const [videoData, setVideoData] = useState({});
	const [selectedVideoId, setSelectedVideoId] = useState("");
	const [commentData, setCommentData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`${LINK}?part=snippet&key=${API_KEY}&maxResults=10`
			);
			setVideos(response.data.items);
		};
		fetchData();

		const existingComments = JSON.parse(localStorage.getItem(`comments-${selectedVideoId}`)) || [];
    	setCommentData(existingComments);
	}, [selectedVideoId]);

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

	return (
		<main className="w-screen h-auto px-5 pt-5 pb-10 font-poppins bg-customBlack text-customWhite md:w-full xl:h-auto">
			<Navbar setVideos={setVideos} />
			<section className="flex flex-col mt-5 gap-5 xl:flex-row">
				<Video
					selectedVideoId={selectedVideoId}
					videoData={videoData}
				/>
				<RelatedVideos
					videos={videos}
					handleVideoClick={handleVideoClick}
				/>
			</section>
			<CommentSection
				commentData={commentData}
				setCommentData={setCommentData}
				selectedVideoId={selectedVideoId}
			/>
		</main>
	);
}

export default App;