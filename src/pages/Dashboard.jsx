import { auth, db } from '../firebase/credentials';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	collection,
	deleteDoc,
	onSnapshot,
	orderBy,
	query,
	where,
	doc,
} from 'firebase/firestore';
import Message from '../components/Message';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const Dashboard = () => {
	const [user, loading] = useAuthState(auth);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	const getData = async () => {
		if (loading) return;
		if (!user) return navigate('/login');

		const postsRef = collection(db, 'posts');
		const q = query(postsRef, where('user', '==', user.uid));
		const unsubscribe = onSnapshot(q, (snap) => {
			console.log(snap.docs);
			setPosts(
				snap.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		});

		return unsubscribe;
	};

	const deletePost = async (id) => {
		await deleteDoc(doc(db, 'posts', id));
	};

	useEffect(() => {
		getData();
	}, [user, loading]);

	return (
		<div>
			<h1 className="text-center font-medium text-lg">
				{user && user.displayName} Dashboard
			</h1>
			{posts.length > 0 ? (
				posts.map((post) => (
					<Message key={post.id} {...post}>
						<div className="flex gap-5 mt-5">
							<div
								className="flex items-center gap-1 text-red-500 font-medium cursor-pointer"
								onClick={() => deletePost(post.id)}
							>
								<AiFillDelete />
								<span>Delete this post</span>
							</div>
							<Link
								to="/post"
								state={{ post: post }}
								className="flex items-center gap-1 text-teal-500 font-medium cursor-pointer"
							>
								<AiFillEdit />
								<span>Edit this post</span>
							</Link>
						</div>
					</Message>
				))
			) : (
				<h2 className="text-lg mt-10 font-medium text-cyan-500">
					Cargando Tus Posts...
				</h2>
			)}
			<button
				className="text-white mt-10 bg-slate-800 px-6 py-2 rounded-lg"
				onClick={() => auth.signOut()}
			>
				Desloguearse
			</button>
		</div>
	);
};

export default Dashboard;
