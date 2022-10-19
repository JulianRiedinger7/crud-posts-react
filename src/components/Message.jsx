import React from 'react';

const Message = ({ children, name, avatar, description, timestamp }) => {
	return (
		<div className="p-4 shadow-xl mt-10 rounded-lg">
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={description}
					className="w-12 aspect-square rounded-full object-contain"
				/>
				<h3 className="text-xl font-medium">{name}</h3>
			</div>
			<div className="mt-5">
				<p>{description}</p>
			</div>
			{children}
		</div>
	);
};

export default Message;
