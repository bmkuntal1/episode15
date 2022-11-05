import React from 'react'
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? <Link to="/login">Login</Link> :
          <>
            <Link to="/posts">posts</Link>
            <Link to="/contact">Contact</Link>
          </>
        }

      </div>
      {user && <div className="user">
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} alt="" width="50" height="50" />
        <button onClick={logout}>Logout</button>
      </div>}
    </div>
  )
}
