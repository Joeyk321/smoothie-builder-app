import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSmoothies, deleteSmoothie } from '../services/smoothiesAPI';
import './ViewAllSmoothies.css';

function ViewAllSmoothies() {
    const [smoothies, setSmoothies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSmoothies();
    }, []);

    const fetchSmoothies = async () => {
        try {
            const data = await getAllSmoothies();
            setSmoothies(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching smoothies:', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this smoothie?')) {
            try {
                await deleteSmoothie(id);
                setSmoothies(smoothies.filter(s => s.id !== id));
            } catch (err) {
                console.error('Error deleting smoothie:', err);
                alert('Failed to delete smoothie');
            }
        }
    };

    if (loading) return <div className="loading">Loading smoothies...</div>;

    return (
        <div className="view-all-smoothies">
            <header>
                <h1>🥤 My Custom Smoothies</h1>
                <Link to="/" className="create-new-btn">+ Create New Smoothie</Link>
            </header>

            {smoothies.length === 0 ? (
                <div className="no-smoothies">
                    <p>No smoothies yet! Create your first one.</p>
                    <Link to="/" className="create-first-btn">Create Your First Smoothie</Link>
                </div>
            ) : (
                <div className="smoothies-grid">
                    {smoothies.map(smoothie => (
                        <div key={smoothie.id} className="smoothie-card">
                            <h2>{smoothie.name}</h2>
                            <div className="smoothie-details">
                                <p><strong>Size:</strong> {smoothie.size}</p>
                                <p><strong>Price:</strong> ${smoothie.total_price}</p>
                                <p className="date">Created: {new Date(smoothie.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="card-actions">
                                <Link to={`/edit/${smoothie.id}`} className="edit-btn">Edit</Link>
                                <button onClick={() => handleDelete(smoothie.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewAllSmoothies;