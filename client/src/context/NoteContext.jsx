import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);

    const getNotes = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://repaste-6z5j.onrender.com/api/notes', {
            headers: { 'x-auth-token': token },
        });
        setNotes(res.data);
    };

    const getNote = useCallback(async (id) => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://repaste-6z5j.onrender.com/api/notes/${id}`, {
            headers: { 'x-auth-token': token },
        });
        setNote(res.data);
    }, []);

    const saveNote = async (form) => {
        const token = localStorage.getItem('token');
        try {
            if (form._id) {
                await axios.put(`https://repaste-6z5j.onrender.com/api/notes/${form._id}`, form, {
                    headers: { 'x-auth-token': token }
                });
            } else {
                await axios.post('https://repaste-6z5j.onrender.com/api/notes', form, {
                    headers: { 'x-auth-token': token },
                    timeout: 30000
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