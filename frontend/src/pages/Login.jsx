import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import api from "../api/api";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const axi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const signin = () => {
    axi
      .post("/auth/signin", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data[0].accessToken);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signup = () => {
    axi
      .post("/auth/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto max-w-sm p-4 bg-white rounded shadow mt-4">
      <div>
        <h1 className="text-center font-bold text-lg">Login</h1>

        <div className="flex flex-col mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-1"
          />
        </div>

        <div className="text-center space-x-4">
          <button
            className="bg-purple-500 px-3 py-1 text-white rounded cursor-pointer"
            onClick={signup}
          >
            Sign up
          </button>

          <button
            className="bg-blue-500 px-3 py-1 text-white rounded cursor-pointer"
            onClick={signin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
