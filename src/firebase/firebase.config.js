// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/* const firebaseConfig = {
  apiKey: "AIzaSyATmaO_XJwLVL6dwJ7oV7aBDGyZtFrdfQI",
  authDomain: "book-store-mern-app-5f25f.firebaseapp.com",
  projectId: "book-store-mern-app-5f25f",
  storageBucket: "book-store-mern-app-5f25f.appspot.com",
  messagingSenderId: "12645785390",
  appId: "1:12645785390:web:152fdc425199d6b0f164bf"
};
 */
