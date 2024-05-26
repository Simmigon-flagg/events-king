"use client"
import React, { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import TopicsContext from '@/context/TopicsContext'
import { useRouter } from 'next/navigation'

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?")
    if (confirmed) {
      await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      })
      router.refresh();
    }
  }

  // const { handleDelete } = useContext(TopicsContext)
  return (
    <button onClick={removeTopic}>

      <FaTrash className='text-red-500 text-4xl' /**onClick={handleDelete} */ />
    </button>
  )
}

export default RemoveBtn