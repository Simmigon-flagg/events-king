'use client'
import React, { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import RemoveBtn from '../Buttons/RemoveBtn'
import TopicsContext from '@/context/TopicsContext'

const TopicsForm = () => {
    const { handleEdit } = useContext(TopicsContext);
  return (
    <div>
        <div>
            <input type="text" placeholder='title' />
            <input type="text" placeholder='desc' />
            <input type="text" placeholder='speaker' />
            <input type="text" placeholder='date' />
            <input type="text" placeholder='time' />
            <input type="text" placeholder='location' />
        </div>
        <div>
            <RemoveBtn />
            <FaEdit onClick={handleEdit}/>
        </div>
    </div>
  )
}

export default TopicsForm