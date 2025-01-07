// Layout.jsx
import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LinearProgress } from '@mui/material'

import MyAlert from '../components/myalert'

import logo from '/logo.png'

const Layout = () => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div>
                {loading && <LinearProgress />}
                <MyAlert />
                <header className='flex flex-row justify-between'>
                    <div className=''>
                        <a href="/" className='flex items-center my-3'>
                            <img src={logo} className="logo w-10 mx-5" alt="Topic trend analysis logo" />
                            <div className='text-violet-700 font-mono text-3xl font-bold'>TrendAnalysis</div>
                        </a>
                    </div>
                    <nav>
                        <ul className='flex me-5'>
                            <li className='m-3'>
                                <Link to="/">Home</Link>
                            </li>
                            <li className='m-3'>
                                <Link to="/about">About</Link>
                            </li>
                            <li className='m-3'>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className='h-[89vh] overflow-y-scroll'>
                    <Outlet context={{ setLoading }} />
                </main>
                <footer className='absolute left-[43%] bottom-2'>
                    <p>© 2025 TrendAnalysis. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default Layout;