import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase/credentials';
import { auth } from '../firebase/credentials';

const Post = () => {
	const [formData, setFormData] = useState({
		description: '',
	});
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const location = useLocation();
	console.log('location', location);

	const handleChange = (evt) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			description: evt.target.value,
		}));
	};

	const checkUser = () => {
		if (loading) return;
		if (!user) navigate('/login');
		if (location.state.post.id)
			setFormData((prevFormData) => ({
				...prevFormData,
				description: location.state.post.description,
			}));
	};

	useEffect(() => {
		checkUser();
	}, [loading, user]);

	const addPost = async (evt) => {
		evt.preventDefault();
		const date = Date.now();
		if (formData.description === '' || formData.description.length > 300)
			return;
		if (location.state.post.id) {
			const docRef = doc(db, 'posts', location.state.post.id);
			const updatedPost = {
				...location.state.post,
				...formData,
				timestamp: new Intl.DateTimeFormat('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				}).format(date),
			};
			await updateDoc(docRef, updatedPost);
			return navigate('/');
		} else {
			const postsRef = collection(db, 'posts');
			await addDoc(postsRef, {
				...formData,
				timestamp: new Intl.DateTimeFormat('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				}).format(date),
				user: user.uid,
				name: user.displayName,
				avatar: user.photoURL,
			});

			setFormData({ description: '' });
			navigate('/');
		}
	};

	return (
		<form
			className="mt-20 shadow-xl px-4 py-6 mx-auto flex flex-col space-y-4"
			onSubmit={addPost}
		>
			<h1 className="text-xl font-medium">
				{location.state.post.id ? 'Edita tu post' : 'Crea un nuevo Post!'}
			</h1>
			<label htmlFor="description">Descripcion:</label>
			<textarea
				name="description"
				id="description"
				value={formData.description}
				onChange={handleChange}
				className="bg-slate-800 p-4 h-36 rounded-lg text-white"
				placeholder="Cuentanos..."
			></textarea>
			<p className={formData.description.length > 300 ? 'text-red-500' : ''}>
				{formData.description.length}/300
			</p>
			<button
				type="submit"
				className="bg-cyan-500 text-white font-medium text-lg rounded-lg py-2"
			>
				{location.state.post.id ? 'Editar' : 'Postear'}
			</button>
		</form>
	);
};

export default Post;
