import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MyHomePage = () => {
    const url = process.env.URL || "http://localhost:8080/";
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(url + "getBlogEmail/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(url + `deleteBlog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(blogs.filter(blog => blog.id !== id));
            alert('Blog deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleGetBlog = (id) => navigate(`/readblog/${id}`);
    const handleUpdateBlog = (id) => navigate(`/updateBlog/${id}`);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }) + ' ' + date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const styles = {
        navBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#4CAF50',
            padding: '10px 20px',
            color: 'white',
            fontSize: '18px',
        },
        navLinks: {
            display: 'flex',
            gap: '20px',
        },
        navButton: {
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        container: {
            maxWidth: '1000px',
            margin: '50px auto',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        },
        blogCard: {
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        blogContent: { flex: '1' },
        title: { fontSize: '24px', color: '#4CAF50', marginBottom: '10px' },
        author: { fontStyle: 'italic', color: '#555' },
        content: { marginTop: '10px', lineHeight: '1.6' },
        lastUpdated: { color: '#888', fontSize: '14px', marginTop: '5px' },
        buttonContainer: {
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: '10px',
            marginTop: '10px',
        },
        button: {
            padding: window.innerWidth <= 768 ? '12px 18px' : '8px 12px',
            borderRadius: '8px',
            fontSize: window.innerWidth <= 768 ? '16px' : '12px',
            cursor: 'pointer',
            color: 'white',
            textAlign: 'center',
        },
        readButton: { backgroundColor: '#ffa500' },
        updateButton: { backgroundColor: '#007bff' },
        deleteButton: { backgroundColor: 'red' },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px',
        },
        pageButton: {
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#007BFF',
            color: 'white',
        },
        disabledButton: { backgroundColor: '#ccc' },
    };

    return (
        <>
            {/* NavBar */}
            <nav style={styles.navBar}>
                <span>📝 My Blog App</span>
                <div style={styles.navLinks}>
                    <Link to="/" style={styles.navButton}>Home</Link>
                    <Link to="/createBlog" style={styles.navButton}>Create Blog</Link>
                    <Link to="/myBlog" style={styles.navButton}>My Blogs</Link>
                    <button onClick={handleLogout} style={{ ...styles.navButton, background: 'none', border: 'none', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Blog Content */}
            <div style={styles.container}>
                {currentBlogs.length > 0 ? (
                    currentBlogs.map(blog => (
                        <div key={blog.id} style={styles.blogCard}>
                            <div style={styles.blogContent}>
                                <h2 style={styles.title}>{blog.title}</h2>
                                <p style={styles.author}>By {blog.author}</p>
                                <p style={styles.content}>{blog.content.substring(0, 150)}...</p>
                                <p style={styles.lastUpdated}>
                                    Last Updated: {blog.updatedAt ? formatDate(blog.updatedAt) : 'N/A'}
                                </p>
                            </div>
                            <div style={styles.buttonContainer}>
                                <button
                                    onClick={() => handleGetBlog(blog.id)}
                                    style={{ ...styles.button, ...styles.readButton }}
                                >
                                    Read
                                </button>
                                <button
                                    onClick={() => handleUpdateBlog(blog.id)}
                                    style={{ ...styles.button, ...styles.updateButton }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    style={{ ...styles.button, ...styles.deleteButton }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#555' }}>No blogs available.</p>
                )}

                {/* Pagination */}
                {blogs.length > blogsPerPage && (
                    <div style={styles.pagination}>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === 1 ? styles.disabledButton : {}),
                            }}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === totalPages ? styles.disabledButton : {}),
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyHomePage;
