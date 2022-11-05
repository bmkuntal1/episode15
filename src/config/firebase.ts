// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7pWRvDsLVVKaKbqVzjmhQfJ_KDUsvGTU",
  authDomain: "react-course-a9ece.firebaseapp.com",
  projectId: "react-course-a9ece",
  storageBucket: "react-course-a9ece.appspot.com",
  messagingSenderId: "776045418387",
  appId: "1:776045418387:web:50e123eceba1f967b47a66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider();