import { createContext, useState } from 'react';
import axios from 'axios';

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);

    const getNotes = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/notes', {
            headers: { 'x-auth-token': token },
        });
        setNotes(res.data);
    };

    const getNote = async (id) => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`, {
            headers: { 'x-auth-token': token },
        });
        setNote(res.data);
    };

    const saveNote = async (form) => {
        const token = localStorage.getItem('token');
        try {
            if (form._id) {
                await axios.put(`http://localhost:5001/api/notes/${form._id}`, form, {
                    headers: { 'x-auth-token': token }
                });
            } else {
                await axios.post('http://localhost:5001/api/notes', form, {
                    headers: { 'x-auth-token': token }
                });
            }
        } catch (err) {
            if (err.response?.data?.code === 11000) {
                alert('This custom URL is already taken. Please choose another one.');
            } else {
                alert('Failed to save note. Please try again.');
            }
            throw err;
        }
    };

    return (
        <NoteContext.Provider value={{ notes, note, getNotes, getNote, saveNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteProvider;