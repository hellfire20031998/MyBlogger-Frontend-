import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const url = process.env.URL || "http://localhost:8080/";
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + "signIn", credentials);

            if (response.data.responseStatus === 'SUCCESS') {
                alert('Sign in successful!');
                setCredentials({ email: '', password: '' });
            }
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log("Token stored in localStorage:", localStorage.getItem('token'));
                navigate('/myBlog');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Invalid email or password. Please try again.');
        }
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

    return (
        <>
            {/* Navbar */}
            <nav style={navBarStyle}>
                <span>📝 My Blog App</span>
                <div style={navLinksStyle}>
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/signup" style={navLinkStyle}>Sign Up</Link>
                </div>
            </nav>

            {/* Sign In Form */}
            <div style={containerStyle}>
                <h2>Sign In</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" style={buttonStyle}>Sign In</button>
                </form>
                <Link to="/signup" style={linkStyle}>Don't have an account? Sign Up</Link>
            </div>
        </>
    );
};

export default SignIn;
