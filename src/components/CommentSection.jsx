import React from "react";

const CommentSection = ({
	handleSubmitComment,
    comment,
	setComment,
	setCommentError,
	commentError,
	commentData,
	handleReactToComment,
}) => {
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
					rows="2"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
						setCommentError("");
					}}
					className="w-full rounded-sm mt-3 text-customBlack p-2"
				></textarea>
				{commentError && (
					<p className="text-xs text-red-500 font-bold">
						{commentError}
					</p>
				)}
				<input
					type="submit"
					value="post"
					id="post"
					name="post"
					className="bg-green-500 px-4 py-1 rounded-sm cursor-pointer self-end"
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
