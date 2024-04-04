import React, { useState } from "react";

const CommentSection = ({ commentData, setCommentData, selectedVideoId }) => {
	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState("");

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
		<section className="mt-5 xl:w-[949px] xl:mt-10">
			<h3>Post a comment</h3>
			<form
				onSubmit={handleSubmitComment}
				className="flex flex-col gap-2"
			>
				<textarea
					name="message"
					id="message"
					rows="3"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
						setCommentError("");
					}}
					className="w-full rounded-md mt-3 text-customWhite bg-slate-900 p-3 text-sm outline-none"
				></textarea>
				{commentError && (
					<p className="text-sm text-red-700 font-semibold">
						{commentError}
					</p>
				)}
				<input
					type="submit"
					value="post"
					id="post"
					name="post"
					className="bg-red-700 px-4 py-1 rounded-sm cursor-pointer self-end"
				/>
			</form>
			<div className="flex flex-col gap-2 mt-5">
				<h3 className="font-bold">Comments</h3>
				<ul className="flex flex-col gap-3 pl-3">
					{commentData.map((userComment) => (
						<li
							key={userComment.id}
							className="flex flex-col gap-1"
						>
							<p>{userComment.message}</p>
							<div className="flex gap-2 text-xs text-gray-500">
								<div className="flex gap-2">
									<p
										className="cursor-pointer hover:underline"
										title="like"
										onClick={() =>
											handleReactToComment(
												userComment.id,
												"like"
											)
										}
									>
										like
									</p>
									<p>{userComment.likes}</p>
								</div>
								<p>|</p>
								<div className="flex gap-2">
									<p
										className="cursor-pointer hover:underline"
										title="dislike"
										onClick={() =>
											handleReactToComment(
												userComment.id,
												"dislike"
											)
										}
									>
										dislike
									</p>
									<p>{userComment.dislikes}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default CommentSection;