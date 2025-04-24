import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="page-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout; 