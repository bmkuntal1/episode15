import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../config/firebase';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log("LOGIN: ", result);
    navigate("/")
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}  
