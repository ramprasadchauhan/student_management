// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// "AIzaSyDO96zLsLL_I_YRkB2YHBd1kqZiYRIVuxY",

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "student-management-2987b.firebaseapp.com",
  projectId: "student-management-2987b",
  storageBucket: "student-management-2987b.appspot.com",
  messagingSenderId: "652041450617",
  appId: "1:652041450617:web:e9eb0162bbaf3217fa10a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
