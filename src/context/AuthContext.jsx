import { createContext, useContext, useEffect, useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// authProvider

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// register a user
	const registerUser = async (email, password) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	// login a user
	const loginUser = async (email, password) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	// sign up with google
	const signInWithGoogle = async () => {
		return await signInWithPopup(auth, googleProvider);
	};

	// logout user
	const logout = () => {
		return signOut(auth);
	};

	// manage user
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);

			if (user) {
				const { email, displayName, photoURL } = user;
				const userData = {
					email,
					username: displayName,
					photo: photoURL,
				};
			}
		});

		return () => unsubscribe();
	}, []);

	const value = {
		currentUser,
		registerUser,
		loginUser,
		signInWithGoogle,
		logout,
		loading,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
