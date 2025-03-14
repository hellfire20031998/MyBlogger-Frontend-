import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const url = process.env.URL || "http://localhost:8080/";
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        author: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(url + "createBlog/", blog, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            navigate('/myBlog');
            alert('Blog created successfully!');
            setBlog({ title: '', content: '', author: '' });
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Failed to create blog');
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '30px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '32px',
            color: '#4CAF50',
        },
        input: {
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        textArea: {
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            height: '150px',
            resize: 'none',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
        },
        button: {
            flex: 1,
            padding: '12px',
            fontSize: '18px',
            borderRadius: '8px',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            textAlign: 'center',
        },
        createButton: {
            backgroundColor: '#4CAF50',
        },
        backButton: {
            backgroundColor: '#007BFF',
            textDecoration: 'none',
            display: 'inline-block',
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={blog.title}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Blog Content"
                    value={blog.content}
                    onChange={handleChange}
                    style={styles.textArea}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={blog.author}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <div style={styles.buttonContainer}>
                    <button type="submit" style={{ ...styles.button, ...styles.createButton }}>
                        Create Blog
                    </button>
                    <Link to="/myBlog" style={{ ...styles.button, ...styles.backButton }}>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
