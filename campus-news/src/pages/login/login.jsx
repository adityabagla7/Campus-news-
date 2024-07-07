import React from 'react'
import './login.scss'
const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
            <h1>BPGC News Portal</h1>
            <p>
                The news portal of BITS Goa, social media application.
            </p>
            <span>Don't have an account?</span>
            <button>Register</button>
        </div>
        <div className="right">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='Username'></input>
                <input type="password" placeholder='Password'></input>
                <button>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
