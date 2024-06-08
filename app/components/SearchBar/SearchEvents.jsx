"use client"
import Link from 'next/link'
import RemoveBtn from '../Buttons/RemoveBtn'
import { FaEdit } from 'react-icons/fa'
import React, { useState } from 'react'

const SearchBar = ({ items, id }) => {

    const [searchTerm, setSearchTerm] = useState({
        title: ""
    });

    const handleSearch = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearchTerm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <>
            <input type='text' name="title" value={searchTerm.title} placeholder='Search' onChange={handleSearch} />
            {items.filter(item => {
                if (searchTerm.title === "" || searchTerm.title == null) {
                    return item;
                }
                if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
                    return item;
                }
                return null;
            }).map(item => (
                <div key={item._id}>
                    <div>{item._id}</div>
                   
                    <Link href={`/topicdetails/${item._id}`}>
                        <h2>{item.title}</h2>
                    </Link>
                    <p>{item.desc}</p>
                    <RemoveBtn id={item._id} />
                    <Link href={`/edittopic/${item._id}`}>
                        <FaEdit />
                    </Link>
                </div>
            ))}
        </>
    );
};

export default SearchBar;
