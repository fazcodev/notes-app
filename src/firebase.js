// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDoBZLZtXCrBedLutOlgvtaWyK8jBei3u0",
  authDomain: "auth-notesapp-development.firebaseapp.com",
  projectId: "auth-notesapp-development",
  storageBucket: "auth-notesapp-development.appspot.com",
  messagingSenderId: "807109551889",
  appId: "1:807109551889:web:33c2cfd2143e6508e44eb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
