import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/credentials';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
	const [user, loading] = useAuthState(auth);

	return (
		<nav className="py-4 flex items-center justify-between">
			<Link to="/" className="font-medium text-2xl">
				❄ WinterPosts
			</Link>
			<ul>
				{!user ? (
					<Link
						to="/login"
						className="bg-cyan-500 font-medium text-white px-4 py-2 rounded-lg"
					>
						Unirse
					</Link>
				) : (
					<div className="flex items-center gap-5">
						<Link
							to="/post"
							className="font-medium px-4 py-2 bg-cyan-500 text-white rounded-lg"
						>
							Post
						</Link>
						<Link to="/dashboard" className="flex items-center gap-1">
							<img
								src={user.photoURL}
								alt={user.displayName}
								className="w-12 aspect-square rounded-full"
							/>
						</Link>
					</div>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
