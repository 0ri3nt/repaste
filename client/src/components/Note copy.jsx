import { useState, useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeMirror from '@uiw/react-codemirror';

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
                    <CodeMirror
                        value={form.content}
                        height="50%"
                        width='100%'
                        theme="dark"
                        onChange={(value) => {
                            setIsEditing(true);
                            setForm(prevForm => ({
                                ...prevForm,
                                content: value
                            }));
                        }}
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
            <div className='container'>
                <h2>Preview</h2>
                <ReactMarkdown
                    children={form.content}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={docco}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Note;