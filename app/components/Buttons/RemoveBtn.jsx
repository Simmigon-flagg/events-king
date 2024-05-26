
import React, { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import TopicsContext from '@/context/TopicsContext'

const RemoveBtn = () => {
    const { handleDelete } = useContext(TopicsContext)
  return (
    <FaTrash className='text-red-500 text-4xl' onClick={handleDelete}/>
  )
}

export default RemoveBtn