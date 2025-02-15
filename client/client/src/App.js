import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import AuthProvider from './context/AuthContext';
import NoteProvider from './context/NoteContext';
import Auth from './components/Auth';
import Note from './components/Note';
import Dashboard from './components/Dashboard';
import ViewNote from './components/ViewNote';
import MarkdownReference from './components/MarkdownReference';
import AboutUs from './components/AboutUs';
import Inspiration from './components/Inspiration';
import Layout from './components/Layout';

const App = () => {
    return (
        <AuthProvider>
            <NoteProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                            <Route path="/note/:id" element={<PrivateRoute component={Note} />} />
                            <Route path="/new-note" element={<PrivateRoute component={Note} />} />
                            <Route path="/n/:customUrl" element={<ViewNote />} />
                            <Route path="/markdown-reference" element={<MarkdownReference />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/inspiration" element={<Inspiration />} />
                        </Routes>
                    </Layout>
                </Router>
            </NoteProvider>
        </AuthProvider>
    );
};

export default App;