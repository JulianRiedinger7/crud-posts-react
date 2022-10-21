import { auth, db } from '../firebase/credentials';
import { useAuthState } from 'react-firebase-hooks/auth';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import 'react-toastify/dist/ReactToastify.css';
import Comment from '../components/Comment';

const Comments = () => {
	const [user, loading] = useAuthState(auth);
	const [allMessages, setAllMessages] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef();

	const checkUser = () => {
		if (loading) return;
		if (!user) return navigate('/login');
	};

	const submitMessage = async (evt) => {
		evt.preventDefault();
		if (inputRef.current.value === '')
			return toast.error('Comentario no valido 😅', {
				position: 'top-center',
				autoClose: 1500,
			});

		const date = Date.now();
		const docRef = doc(db, 'posts', location.state.post.id);
		await updateDoc(docRef, {
			comments: arrayUnion({
				message: inputRef.current.value,
				avatar: user.photoURL,
				username: user.displayName,
				id: Date.now(),
				timestamp: new Intl.DateTimeFormat('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				}).format(date),
			}),
		});

		inputRef.current.value = '';
		return toast.success('Comentario agregado!', {
			position: 'top-center',
			autoClose: 1500,
		});
	};

	const getComments = async () => {
		const docRef = doc(db, 'posts', location.state.post.id);
		const unsubscribe = onSnapshot(docRef, (snap) => {
			setAllMessages(snap.data().comments);
		});
		return unsubscribe;
	};

	useEffect(() => {
		checkUser();
	}, [user, loading]);

	useEffect(() => {
		getComments();
	}, []);

	return (
		<div>
			<h1 className="text-xl font-semibold">Comentarios</h1>
			<Message {...location.state.post}></Message>

			<form className="my-5 flex w-full" onSubmit={submitMessage}>
				<input
					type="text"
					placeholder="Escribe tu comentario 😀"
					className="bg-slate-800 text-white p-2 border-none flex-1"
					ref={inputRef}
				/>
				<button type="submit" className="bg-cyan-500 text-white px-5 py-2">
					Enviar
				</button>
			</form>

			{allMessages ? (
				allMessages.map((message) => {
					console.log('mensaje id', message.id);

					return <Comment key={message.id} {...message} />;
				})
			) : (
				<h2 className="text-lg text-cyan-500 text-center font-medium">
					Se el primero en comentar sobre este posteo!
				</h2>
			)}
		</div>
	);
};

export default Comments;
