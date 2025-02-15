// AboutUs.js
import React from 'react';
import '../index.css'; // Create this file for styles

const AboutUs = () => {
    return (
        <div className="container">
            <h1>About Us</h1>
            <div className="team-grid">
                <div className="team-member">
                    <div className="image-container">
                        <img src="/agni.jpg" alt="Agnivesh Singh"/>
                    </div>
                    <h2>Agnivesh Singh</h2>
                    <p>PES2UG23CS034 <br/>
                     Authentication & UI/UX
                    </p>
                </div>
                
                <div className="team-member">
                    <div className="image-container">
                        <img src="/akshaj.jpg" alt="Akshaj Hedau"/>
                    </div>
                    <h2>Akshaj Hedau</h2>
                    <p>PES2UG23CS041<br/>
                    Backend & DB
                    </p>
                </div>
                
                <div className="team-member">
                    <div className="image-container">
                        <img src="/abhi.jpg" alt="Abhishrut Kaushik"/>
                    </div>
                    <h2>Abhishrut Kaushik</h2>
                    <p>PES2UG23CS023 <br/>
                    React Pages
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;