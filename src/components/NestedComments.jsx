import { useState } from "react";

const NestedComment = () => {
	const [isReplyClicked, setIsReplyClicked] = useState(false);
	const [isCommentSaved, setIsCommentSaved] = useState(false);
	const [userComment, setUserComment] = useState("");

	return (
		<div className='ml-[30px]'>
			<div>
				{isCommentSaved ? (
					<div className='w-[400px] inline-block'>{userComment}</div>
				) : (
					<input
						value={userComment}
						onChange={(e) => setUserComment(e.target.value.trim())}
						className='w-[400px] h-[30px] inline-block border border-black'
						type='text'></input>
				)}
				{!isCommentSaved && (
					<button
						onClick={() => setIsCommentSaved(true)}
						className='bg-blue-500 ml-4 text-white px-4'>
						Save
					</button>
				)}
			</div>
			{isCommentSaved && (
				<button
					onClick={() => setIsReplyClicked(true)}
					className='text-blue-500 text-xs mb-5'>
					Add a reply
				</button>
			)}
			{isReplyClicked ? <NestedComment /> : null}
		</div>
	);
};

export default NestedComment;
