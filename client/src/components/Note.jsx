import { useState, useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';

const Note = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getNote, saveNote, note } = useContext(NoteContext);
    const [form, setForm] = useState({ title: '', content: '', privacy: true, customUrl: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            getNote(id);
        } else {
            setForm({ title: '', content: '', privacy: true, customUrl: '' });
        }
    }, [id, getNote]);

    useEffect(() => {
        if (note && id && !isEditing) {
            setForm(note);
        }
    }, [note, id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIsEditing(true);
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const validateCustomUrl = (url) => {
        return /^[a-zA-Z0-9-_]+$/.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate title
        if (!form.title.trim()) {
            alert('Please enter a title for your note');
            return;
        }

        // Validate content
        if (!form.content.trim()) {
            alert('Please enter some content for your note');
            return;
        }

        // Validate custom URL
        if (!validateCustomUrl(form.customUrl)) {
            alert('Custom URL can only contain letters, numbers, hyphens and underscores');
            return;
        }

        await saveNote(form);
        setIsEditing(false);
        navigate('/dashboard');
    };


    return (
        <div className="container">
            <h1>{id ? 'Edit Note' : 'New Note'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <MDEditor
                      value={form.content}
                      onChange={(val) => setForm(prev => ({ ...prev, content: val || '' }))}
                      textareaProps={{ placeholder: "Enter text here..." }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customUrl">Custom URL</label>
                    <input
                        name="customUrl"
                        value={form.customUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="button">Save Note</button>
            </form>
        </div>
    );
};

export default Note;