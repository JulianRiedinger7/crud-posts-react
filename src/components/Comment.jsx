const Comment = ({ avatar, username, message, timestamp }) => {
	return (
		<div className="p-4 shadow-xl flex flex-col border-2 rounded-lg my-4 border-slate-800">
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={username}
					className="w-12 aspect-square object-contain rounded-full"
				/>
				<h3 className="font-medium">{username}</h3>
			</div>
			<p className="py-2">{message}</p>
			<p className="italic font-semibold self-end text-sm">{timestamp}</p>
		</div>
	);
};

export default Comment;
