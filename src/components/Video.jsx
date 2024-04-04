import React from "react";

const Video = ({ selectedVideoId, videoData }) => {
	return (
		<div className="flex flex-col gap-3 md:gap-5">
			<iframe
				src={`https://www.youtube.com/embed/${selectedVideoId}`}
				title={videoData.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				className="w-full h-60 object-contain rounded-lg md:h-96 lg:h-[500px] xl:w-[949px] xl:h-[534px]"
			></iframe>
			{videoData && (
				<div className="flex flex-col gap-3">
					<h2 className="text-lg font-medium">
						<p>{videoData.title}</p>
					</h2>
					<div className="flex items-center gap-2">
						<p className="w-12 h-12 bg-slate-400 text-customBlack font-extrabold flex items-center justify-center rounded-full text-2xl">
							{videoData.channelTitle &&
								videoData.channelTitle[0]}
						</p>
						<p>{videoData.channelTitle}</p>
					</div>
					<div className="flex flex-col gap-5 p-5 rounded-lg bg-slate-900 xl:w-[949px]">
						<p className="text-sm">{videoData.description}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Video;