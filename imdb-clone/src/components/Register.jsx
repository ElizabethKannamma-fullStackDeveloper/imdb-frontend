import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"

function Register() {
    const navigateTo = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("https://imdb-clone-g6ud.onrender.com/auth/register", user).then(res => {
            setUser(res.data)
            navigateTo("/login")
        })
        localStorage.setItem("USER", JSON.stringify({ user }))
        console.log(user);
    }

    return (
        <div className="register-container">
            <h2 className="register-heading">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                />
                <button type="submit">Register</button>
                <Link to="/login">
                    <button type="button" className="btn-success">Login</button>
                </Link>
            </form>
        </div>
    )
}

export default Register;
