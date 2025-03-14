import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const url = process.env.URL || "http://localhost:8080/";
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match! Please try again.");
            return;
        }

        try {
            const response = await axios.post(url + "createUser", {
                username: user.username,
                email: user.email,
                password: user.password,
            });

            alert('Sign up successful! You can now sign in.');
            navigate('/signin');
            setUser({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    const navBarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: '10px 20px',
        color: 'white',
        fontSize: '18px',
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '20px',
    };

    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    };

    const formStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '14px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    };

    const linkStyle = {
        marginTop: '10px',
        color: '#4CAF50',
        textDecoration: 'none',
        textAlign: 'center',
        display: 'block',
    };

    return (
        <>
            {/* Navbar */}
            <nav style={navBarStyle}>
                <span>📝 My Blog App</span>
                <div style={navLinksStyle}>
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/signin" style={navLinkStyle}>Sign In</Link>
                </div>
            </nav>

            {/* Sign Up Form */}
            <div style={containerStyle}>
                <h2>Sign Up</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
                <Link to="/signin" style={linkStyle}>Already have an account? Sign In</Link>
            </div>
        </>
    );
};

export default SignUp;
