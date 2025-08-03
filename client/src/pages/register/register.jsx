import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const response = await makeRequest.post("auth/register", inputs);
      if (response.data.message === "User has been created.") {
        navigate("/login");
      }
    } catch (err) {
      setErr(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>BPGC News.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              disabled={loading}
            />
            {err && <div className="error">{err}</div>}
            <button onClick={handleClick} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;