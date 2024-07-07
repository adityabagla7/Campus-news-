import React from 'react'
import './register.scss'
const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
            <h1>BPGC News Portal</h1>
            <p>
                The news portal of BITS Goa, social media application.
            </p>
            <span>Already have an account?</span>
            <button>Login</button>
        </div>
        <div className="right">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder='Name'></input>
                <input type="text" placeholder='Username'></input>
                <input type="email" placeholder='Email'></input>
                <input type="password" placeholder='Password'></input>
                <button>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
