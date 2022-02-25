import { useState, useEffect, useContext, createContext } from "react";

import auth from "./Firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);

	// Wrap any Firebase methods we want to use making sure ...
	// ... to save the user to state.

	const googleProvider = new GoogleAuthProvider();
	const handleGoogleLogin = () => {
		return signInWithPopup(auth, googleProvider).then((res) => {
			setUser(res.user);
			return res.user;
		});
	};

	const signin = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password).then((response) => {
			setUser(response.user);
			return response.user;
		});
	};

	const signup = (email, password) => {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				setUser(response.user);
				return response.user;
			});
	};

	const signout = () => {
		return signOut(auth).then(() => {
			setUser(false);
		});
	};

	const sendPasswordResetEmail = (email) => {
		return auth.sendPasswordResetEmail(email).then(() => {
			return true;
		});
	};

	const confirmPasswordReset = (code, password) => {
		return auth.confirmPasswordReset(code, password).then(() => {
			return true;
		});
	};

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	// Return the user object and auth methods
	return {
		user,
		handleGoogleLogin,
		signin,
		signup,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
	};
}
