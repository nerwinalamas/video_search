import React from "react";

const RelatedVideos = ({ videos, handleVideoClick }) => {
	return (
		<ul className="max-h-96 overflow-y-auto p-1 flex flex-col gap-5 xl:w-full xl:max-h-[534px]">
			{videos.map((video) => (
				<li
					key={video.id.videoId}
					className="flex gap-5 items-center cursor-pointer hover:border hover:border-customWhite"
					onClick={() => handleVideoClick(video.id.videoId)}
				>
					<img
						src={video.snippet.thumbnails.high.url}
						alt={video.snippet.title}
						className="w-32 h-20 object-contain"
					/>
					<p>{video.snippet.title}</p>
				</li>
			))}
		</ul>
	);
};

export default RelatedVideos;
