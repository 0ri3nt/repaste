import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { notes, getNotes } = useContext(NoteContext);
    const { authData, logout } = useContext(AuthContext);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const deleteNote = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5001/api/notes/${id}`, {
                headers: { 'x-auth-token': token },
            });
            getNotes();
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    return (
        <div className="main-container">
            <nav className="navbar">
                <h1>rePaste</h1>
                <Link to="/new-note" className="button">New Note</Link>
                <button className="button button-secondary" onClick={logout}>
                    Logout
                </button>
            </nav>
            <div className="container">
                <div className="header">
                    <h1>Welcome, {authData?.user?.username || 'Guest'}!</h1>
                </div>
                <div className="grid">
                    {notes.map((note) => (
                        <div key={note._id} className="note-card">
                            <h2>{note.title}</h2>
                            <p>{note.content.substring(0, 100)}...</p>
                            <div className="note-card-footer">
                                <Link to={`/n/${note.customUrl}`} className="button">View</Link>
                                <Link to={`/note/${note._id}`} className="button">Edit</Link>
                                <button onClick={() => deleteNote(note._id)} className="button button-secondary">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;