import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { auth, db } from '../firebase/credentials';

const Home = () => {
	const [user, loading] = useAuthState(auth);
	const [allPosts, setAllPosts] = useState([]);
	const navigate = useNavigate();

	const getPosts = async () => {
		const postsRef = collection(db, 'posts');
		const q = query(postsRef, orderBy('timestamp', 'desc'));
		const unsubscribe = onSnapshot(q, (snap) => {
			setAllPosts(
				snap.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		});

		return unsubscribe;
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>
			{!user && (
				<h2 className="text-xl mt-20 font-medium text-cyan-500">
					Unete para comenzar a postear!
				</h2>
			)}
			{user && (
				<h2 className="text-lg font-medium">
					Bienvenido, {user.displayName}! Aqui veras todos los posts
				</h2>
			)}
			{allPosts.length > 0 ? (
				allPosts.map((post) => (
					<Message key={post.id} {...post}>
						<Link
							to={`/comments/${post.id}`}
							state={{ post: post }}
							className="font-medium"
						>
							{post.comments ? post.comments.length : 0} comentarios
						</Link>
					</Message>
				))
			) : (
				<h2 className="text-cyan-500 font-medium text-xl text-center mt-20">
					Cargando posts...
				</h2>
			)}
		</div>
	);
};

export default Home;
