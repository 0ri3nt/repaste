import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';



const ViewNote = () => {
    const { customUrl } = useParams();
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5001/api/notes/url/${customUrl}`, {
                    headers: { 'x-auth-token': token }
                });
                setNote(res.data);
                console.log(res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching note:', err);
                setError(err.response?.data?.msg || 'Error loading note');
            }
        };
        
        if (customUrl) {
            fetchNote();
        }
    }, [customUrl, note?.title]);

    return (
        <>
        <h1>{note?.title || "Loading Title..."}</h1>
        <div className='container'>
            <div className='preview-container' data-color-mode="dark">
            {error && 
                <p>{error}</p>}
                {note && (
                    <MDEditor.Markdown source={note.content} style = {{ whitespace : 'pre-wrap'}}/>
                )}
            </div>
        </div>
        </>
    );
};

export default ViewNote;