import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase/credentials';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	const signIn = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			return navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	return (
		<div className="mt-20 shadow-xl p-4 rounded-lg space-y-4">
			<h2 className="text-lg font-medium">
				Logueate con el proveedor principal
			</h2>
			<button
				className="bg-slate-800 w-full py-2 rounded-lg text-white text-center flex items-center gap-2 justify-center"
				onClick={signIn}
			>
				<FcGoogle />
				Ingresar con Google
			</button>
		</div>
	);
};

export default Login;
