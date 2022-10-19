import { auth } from '../firebase/credentials';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	const getData = async () => {
		if (loading) return;
		if (!user) return navigate('/login');
	};

	useEffect(() => {
		getData();
	}, [user, loading]);

	return (
		<div>
			<button
				className="text-white bg-slate-800 px-6 py-2 rounded-lg"
				onClick={() => auth.signOut()}
			>
				Desloguearse
			</button>
		</div>
	);
};

export default Dashboard;
