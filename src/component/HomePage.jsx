import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const url = process.env.URL || "http://localhost:8080/";
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(url + "blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const getUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(url + "getUserDetails", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        };

        fetchBlogs();
        getUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/signin');
    };

    const handleProfileClick = () => {
        navigate('/myBlog');
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    // Pagination
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

    return (
        <div style={styles.container}>
            {/* Navigation Bar */}
            <nav style={styles.nav}>
                <h1 style={styles.logo}>My Blogger</h1>
                <div>
                    {user ? (
                        <div style={styles.profile}>
                            <img
                                src={user.profilePic || 'profilePic.webp'} // Default profile pic
                                alt="Profile"
                                style={styles.profilePic}
                                onClick={handleProfileClick}
                            />
                            <span>{user.username}</span>
                            <button style={styles.logoutButton} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={styles.authLinks}>
                            <Link to="/signin" style={styles.authButton}>
                                Sign In
                            </Link>
                            <Link to="/signup" style={styles.authButton}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Blog Section */}
            <div style={styles.blogContainer}>
                {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                        <div key={blog.id} style={styles.blogCard}>
                            <h2 style={styles.blogTitle}>{blog.title}</h2>
                            <p style={styles.blogAuthor}>By {blog.author}</p>
                            <p style={styles.blogContent}>{blog.content.substring(0, 100)}...</p>
                            <p style={styles.blogDate}>
                                Published: {formatDate(blog.publishDate)} | Last Updated: {formatDate(blog.updatedAt)}
                            </p>
                            <button
                                style={styles.readButton}
                                onClick={() => navigate(`/readblog/${blog.id}`)}
                            >
                                Read Blog
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={styles.noBlogs}>No blogs available</p>
                )}

                {/* Pagination Controls */}
                {blogs.length > blogsPerPage && (
                    <div style={styles.pagination}>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            style={styles.pageButton}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={styles.pageButton}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        backgroundColor: '#f9f9f9',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    profilePic: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        objectFit: 'cover',
        cursor: 'pointer',
    },
    logoutButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#ff6347',
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
    },
    authLinks: {
        display: 'flex',
        gap: '10px',
    },
    authButton: {
        padding: '8px 16px',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
    },
    blogContainer: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
    },
    blogCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    blogTitle: {
        fontSize: '24px',
        color: '#4CAF50',
        marginBottom: '10px',
    },
    blogAuthor: {
        fontStyle: 'italic',
        color: '#555',
    },
    blogContent: {
        marginTop: '10px',
        lineHeight: '1.6',
        color: '#666',
    },
    blogDate: {
        fontSize: '12px',
        color: '#888',
        marginTop: '10px',
    },
    readButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#ffa500',
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    noBlogs: {
        textAlign: 'center',
        color: '#555',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    pageButton: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        disabled: {
            backgroundColor: '#ccc',
        },
    },
};

export default HomePage;
