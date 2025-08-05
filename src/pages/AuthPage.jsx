 import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeForm, setActiveForm] = useState("register");
  const { signUp, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    try {
      await signUp(
        registerData.username,
        registerData.email,
        registerData.password
      );
      navigate("/");
    } catch (err) {
      setRegisterError(err.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signIn(loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const toggleForm = () => {
    setActiveForm(activeForm === "register" ? "login" : "register");
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="auth-container col-md-6 shadow p-4 bg-white rounded">
        <div
          className={`auth-form register ${
            activeForm !== "register" ? "d-none" : ""
          }`}
        >
          <h2 className="text-center mb-4">Register</h2>
          {registerError && (
            <p className="alert alert-danger">{registerError}</p>
          )}
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
              className="form-control mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              className="form-control mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
          <p
            onClick={toggleForm}
            className="text-primary mt-3 text-center"
            role="button"
          >
            Already have an account? Click to Login
          </p>
        </div>
        <div
          className={`auth-form login ${
            activeForm !== "login" ? "d-none" : ""
          }`}
        >
          <h2 className="text-center mb-4">Login</h2>
          {loginError && <p className="alert alert-danger">{loginError}</p>}
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p
            onClick={toggleForm}
            className="text-primary mt-3 text-center"
            role="button"
          >
            Don't have an account? Click to Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
