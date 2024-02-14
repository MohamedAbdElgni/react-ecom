import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function Footer() {
    return (


        <footer className='bottom-0'>
            <div className='container '>
                <div className='row'>
                    <div className='col-md-12'>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/cart'>Cart</Link></li>
                            <li><Link to='/favourits'>Favourits</Link></li>
                            <li><Link to='/search'>Search</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <p>&copy; Copyright 2024</p>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
