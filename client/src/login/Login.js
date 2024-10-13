import axios from "axios";
import { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Change Function
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle Click Function
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Sign in to your account!</h1>
          <form>
            <input
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              required
            />
            <NavLink to="/forgot">
              <span className="text-blue-600 hover:underline">Forgot Password?</span>
            </NavLink>
            <button
              disabled={loading}
              onClick={handleClick}
              className="w-full bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition duration-200 mt-4"
            >
              Login
            </button>
            {error && <span className="text-red-500 mt-4 text-center block">{error.message}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
