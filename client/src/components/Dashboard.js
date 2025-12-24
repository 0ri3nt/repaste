import { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Ensure this file is imported for styles

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
                <Link to="/new-note" className="icon-button">
                    <img src="/NewNote.svg" alt="New Note" />
                </Link>
                <button className="icon-button" onClick={logout}>
                    <img src="/logout.svg" alt="Logout" />
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
                                <Link to={`/n/${note.customUrl}`} className="icon-button">
                                    <img src="/view.svg" alt="View" />
                                </Link>
                                <Link to={`/note/${note._id}`} className="icon-button">
                                    <img src="/edit.svg" alt="Edit" />
                                </Link>
                                <button onClick={() => deleteNote(note._id)} className="icon-button">
                                    <img src="/trash.svg" alt="Delete" />
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