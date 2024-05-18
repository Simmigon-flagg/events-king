"use client"
import React, { useState } from 'react';
import './Navbar.css';
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="navbar" >
        {/* <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", textShadow: "none" }}> */}
            <Link href='/'>
                {/* <p style={{ fontSize: 30, marginLeft: 10, display: "flex", justifyContent: "center", alignSelf: "center" }}><Image */}
                {/* <p ><Image
                    src={0}
                    alt='logo'
                    width="30"
                    height="0"

                ></Image>
                Usana </p> */}
                EVENT KINGS
            </Link>

            <div >
            {/* <div style={{ zIndex: 10, textShadow: "none" }} > */}

                <ul onClick={toggleMenu} id='navbar' className={isActive ? "#navbar active" : "#navbar"}>

                    {/* TODO: set 1 link to active at a time  */}
                    <li><Link /**className="active"*/ href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/music">Music</Link></li>
                    <li><Link href="/videos">Videos</Link></li>
                    <li><Link href="/books">Books</Link></li>
                    <li><Link href="/photos">Photos</Link></li>            
                </ul>
            </div>

            <div id="mobile" onClick={toggleMenu}>
                <i id="bar">{isActive ? <MdClose /> : <FaBars />}</i>
            </div>
        </nav>
    );
};

export default Navbar;
