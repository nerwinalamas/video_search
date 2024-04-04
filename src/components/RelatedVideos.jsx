import React from "react";

const RelatedVideos = ({ videos, handleVideoClick }) => {
	return (
		<ul className="max-h-96 overflow-y-auto p-2 flex flex-col gap-5 bg-slate-900 rounded-lg xl:w-full xl:max-h-[534px]">
			{videos.map((video) => (
				<li
					key={video.id.videoId}
					className="flex gap-5 items-center justify-between cursor-pointer hover:border-slate-400 hover:border"
					onClick={() => handleVideoClick(video.id.videoId)}
				>
					<img
						src={video.snippet.thumbnails.high.url}
						alt={video.snippet.title}
						className="w-40 h-20 object-contain bg-customBlack"
					/>
					<div className="w-80 text-sm flex flex-col gap-1 md:w-full">
						<p>{video.snippet.title}</p>
						<p className="text-slate-400">
							{video.snippet.channelTitle}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default RelatedVideos;