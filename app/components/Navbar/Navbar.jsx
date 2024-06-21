"use client"
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Link from 'next/link';
import { signOut, getSession } from "next-auth/react"


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const onSignOut = async () => {
        signOut()
    }

    useEffect(() => {
        const fetch = async () => {
            const user = await getSession()

            setUser(user?.user)
        }
        fetch()
    }, [])

    return (
        <nav className="navbar">

            <div className="navbar-logo" >
                <Link href="/">
                    <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }} ><svg id="logo-14" width="50px" height="25px" viewBox="0 0 73 49" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M46.8676 24C46.8676 36.4264 36.794 46.5 24.3676 46.5C11.9413 46.5 1.86765 36.4264 1.86765 24C1.86765 11.5736 11.9413 1.5 24.3676 1.5C36.794 1.5 46.8676 11.5736 46.8676 24Z" className="ccustom" fill="#FFF"></path> <path d="M71.1324 24C71.1324 36.4264 61.1574 46.5 48.8529 46.5C36.5484 46.5 26.5735 36.4264 26.5735 24C26.5735 11.5736 36.5484 1.5 48.8529 1.5C61.1574 1.5 71.1324 11.5736 71.1324 24Z" className="ccompli1" fill="#FF7917"></path> <path d="M36.6705 42.8416C42.8109 38.8239 46.8676 31.8858 46.8676 24C46.8676 16.1144 42.8109 9.17614 36.6705 5.15854C30.5904 9.17614 26.5735 16.1144 26.5735 24C26.5735 31.8858 30.5904 38.8239 36.6705 42.8416Z" className="ccompli2" fill="#5D2C02"></path> </svg> Events King</p>
                </Link>
            </div>

            <div onClick={toggleMenu} className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link href="/">Home</Link>
                {/* {user?.name ? <Link href="/dashboard">Dashboard</Link> : null} */}
                <Link href="/about">About</Link>
                {/* <Link href="/products">Products</Link> */}
               
                <Link href="/login">Login/Registar</Link>
                <Link href="/checkin">Check In</Link>
                <Link href="/testpage">Test Page</Link>
                {user?.name ? 
                <>
                <Link href="/events">Events</Link>
                <Link href="/topics">Topics</Link>
                 <button onClick={onSignOut}>Sign out</button>
                </> 
                :
                 <>
                </>}

                <Link href="/">{user?.name}</Link>

            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
    );
};

export default Navbar;
