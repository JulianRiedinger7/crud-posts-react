import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from '../components/Nav';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Post from '../pages/Post';

function App() {
	return (
		<BrowserRouter>
			<main className="mx-7 md:max-w-2xl md:mx-auto">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/post" element={<Post />} />
				</Routes>
				<ToastContainer limit={1} />
			</main>
		</BrowserRouter>
	);
}

export default App;
