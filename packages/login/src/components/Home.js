import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/cards">Go to the Cards page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <div className="flexGrow">
        <button onClick={signOut} class="button sign-out">
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Home;
