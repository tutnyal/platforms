"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "./Home/home.css"
import "./Home/AInime-Home/home-v23.css"
import "./Home/AInime-Home/home-style12.css"
import "./Home/css/header-updated-v2.css"

const Header: React.FC = () => {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setIsTop(position < 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeStyle = {
        color: 'white', // Example active style, adjust as necessary
        background: '#701FBF',
        borderRadius: '8px'
    };

    const inactiveStyle = {
        color: isTop ? 'white' : 'black', // Assuming default inactive style also depends on scroll
    };

    // Helper function to apply styles based on the current path
    const getStyle = (path: string) => {
        if (typeof window !== 'undefined') {
            return window.location.pathname === path ? activeStyle : inactiveStyle;
        }
        return inactiveStyle;
    };

    return (
        <div className="header">
            <div className="header_helobar_div">
                <div className="header_area">
                    <header className='navbar ' >
                        <div className="main_header_area animated">
                            <nav id="navigation1" className={`navigation navigation-landscape ${isTop ? 'screen-atTop' : 'screen-scrolled'}`}>
                                <div className='navbar-start'>
                                    <div className="nav-header">
                                        <Link href="/" className="nav-brand">
                                            
                                                <h1>ainime</h1>
                                            
                                        </Link>
                                        <div className="nav-toggle"></div>
                                    </div>
                                </div>
                                <div className='navbar-end'>
                                    <div className="nav-menus-wrapper" style={{ transitionProperty: 'none' }}>
                                        <span className="nav-menus-wrapper-close-button first">✕</span>
                                        <ul className="nav-menu align-to-right">
                                            <li>
                                                <Link href="/" style={getStyle('/')}>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/demo" style={getStyle('/demo')}>
                                                    Demo
                                                </Link>
                                            </li>
                                             
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default Header;

