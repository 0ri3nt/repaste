import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;