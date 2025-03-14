import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBlog = () => {
    const { id } = useParams(); // Get blog id from URL
    const navigate = useNavigate();
    const url = process.env.URL || "http://localhost:8080/";

    const [blog, setBlog] = useState({
        title: '',
        content: '',
        author: '',
        publishDate: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch existing blog data by ID
    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${url}getBlog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setBlog(response.data.blog); // Pre-fill form with existing blog data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${url}updateBlog/${id}`, blog, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Blog updated successfully!');
            navigate('/myBlog'); // Navigate back to blog list
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading blog data...</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Update Blog</h2>
            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Content:</label>
                    <textarea
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', height: '150px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Published Date:</label>
                    <input
                        type="text"
                        name="publishDate"
                        value={blog.publishDate}
                        disabled
                        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#eee' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '18px', color: '#fff', backgroundColor: '#4CAF50', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Update Blog
                </button>
                <button type="button" style={{ width: '100%', marginTop: '10px', padding: '10px', fontSize: '18px', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/myBlog')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateBlog;
