import React from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
            <h1>BPGC News Portal</h1>
            <p>
                The news portal of BITS Goa, social media application.
            </p>
            <span>Don't have an account?</span>
            <Link to="/register">
            <button>Register</button>
            </Link>
        </div>
        <div className="right">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='Username'></input>
                <input type="password" placeholder='Password'></input>
                <button onClick={handleLogin}>Login</button>
                </form>
        </div>
      </div>
    </div>
  )
}

export default Login
