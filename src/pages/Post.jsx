import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/credentials';
import { auth } from '../firebase/credentials';

const Post = () => {
	const [formData, setFormData] = useState({
		description: '',
	});
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	const handleChange = (evt) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			description: evt.target.value,
		}));
	};

	const addPost = async (evt) => {
		evt.preventDefault();
		const postsRef = collection(db, 'posts');
		await addDoc(postsRef, {
			...formData,
			timestamp: serverTimestamp(),
			user: user.uid,
			name: user.displayName,
			avatar: user.photoURL,
		});

		setFormData({ description: '' });
		navigate('/');
	};

	return (
		<form
			className="mt-20 shadow-xl px-4 py-6 mx-auto flex flex-col space-y-4"
			onSubmit={addPost}
		>
			<h1 className="text-xl font-medium">Cuenta algo sobre ti!</h1>
			<label htmlFor="description">Descripcion:</label>
			<textarea
				name="description"
				id="description"
				value={formData.description}
				onChange={handleChange}
				className="bg-slate-800 p-4 rounded-lg text-white"
				placeholder="Cuentanos..."
			></textarea>
			<p className={formData.description.length > 300 ? 'text-red-500' : ''}>
				{formData.description.length}/300
			</p>
			<button
				type="submit"
				className="bg-cyan-500 text-white font-medium text-lg rounded-lg py-2"
			>
				Postear
			</button>
		</form>
	);
};

export default Post;
