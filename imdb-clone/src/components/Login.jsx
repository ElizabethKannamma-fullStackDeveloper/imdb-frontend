import React, { useState } from 'react';
import axios from "axios";
import jwt_Decode  from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Login() {
  const navigateTo = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://imdb-clone-g6ud.onrender.com/auth/login", user).then(res => {
      console.log(res);
      localStorage.setItem('userToken', res.data.token);
      const decoded = jwt_Decode(res.data.token);
      console.log(decoded.user.id);
      localStorage.setItem("userId", decoded.user.id);
      navigateTo('/home');
    }).catch(error => console.error("Login failed:", error));
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
