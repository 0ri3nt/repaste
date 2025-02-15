import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';



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
            {error && <p>{error}</p>}
            {note && (
                <ReactMarkdown
                    children={note.content}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={atomOneDark}
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
            )}
        </div>
        </>
    );
};

export default ViewNote;