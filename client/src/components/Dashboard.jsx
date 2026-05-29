import { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Ensure this file is imported for styles
import { IconHome, IconClipboardPlus, IconLogout, IconTrash, IconEdit, IconEye } from '@tabler/icons-react';

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
                <Link to="/" className="home-button">
            <IconHome stroke={2} color='#30c853' size={35}/>
            </Link>
                <Link to="/new-note" className="icon-button">
                    <IconClipboardPlus stroke={2} color='#007bff' size={35}/>
                </Link>
                <button className="icon-button" onClick={logout}>
                    <IconLogout stroke={2} color='#ff0000' size={35} />
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
                                    <IconEye stroke={2} color='#30c853' size={35}/>
                                </Link>
                                <Link to={`/note/${note._id}`} className="icon-button">
                                    <IconEdit stroke={2} color='#30c853' size={35} />
                                </Link>
                                <button onClick={() => deleteNote(note._id)} className="icon-button">
                                    <IconTrash stroke={2} color='#ff0000' size={35} />
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