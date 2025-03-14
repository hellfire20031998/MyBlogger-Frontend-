import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ReadBlog = () => {
    const { id } = useParams();
    const url = process.env.URL || "http://localhost:8080/";
    const [blog, setBlog] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem('token');

            if(token){
                try {
                    const response = await axios.get(url + `getBlog/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log("response for blog ",response.data)
                    setBlog(response.data.blog);
                } catch (error) {
                    console.error('Error fetching blog:', error);
                }
            }else{
                navigate('/signin')
            }
        };

        fetchBlog();
    }, [id]);

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        title: {
            fontSize: '32px',
            color: '#4CAF50',
            textAlign: 'center',
        },
        author: {
            fontStyle: 'italic',
            color: '#555',
            textAlign: 'center',
        },
        content: {
            marginTop: '20px',
            lineHeight: '1.6',
            color: '#333',
        },
        backButton: {
            display: 'block',
            width: '100px',
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            textAlign: 'center',
            textDecoration: 'none',
            margin: '20px auto',
        },
    };

    if (!blog) return <p style={{ textAlign: 'center' }}>Loading...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{blog.title}</h1>
            <p style={styles.author}>By {blog.author}</p>
            <p style={styles.content}>{blog.content}</p>
            <Link to="/myBlog" style={styles.backButton}>Back</Link>
        </div>
    );
};

export default ReadBlog;
