// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDpbKr9hlYk3Jcubw5TWJLL9SY1eqpssgI',
	authDomain: 'winterhack-posts.firebaseapp.com',
	projectId: 'winterhack-posts',
	storageBucket: 'winterhack-posts.appspot.com',
	messagingSenderId: '1072508771599',
	appId: '1:1072508771599:web:0989ca88131c978d1a327a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
