
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyA_drYhtQSC0JgvO2Oy5T0gQ2nirGfiPrE",
	authDomain: "movielist-auth.firebaseapp.com",
	projectId: "movielist-auth",
	storageBucket: "movielist-auth.appspot.com",
	messagingSenderId: "668774581339",
	appId: "1:668774581339:web:e29d7703c1f8800edbeb7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;
