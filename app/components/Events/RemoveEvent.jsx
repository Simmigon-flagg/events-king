"use client"
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeEvent = async () => {
    const confirmed = confirm("Are you sure?")
    if (confirmed) {
      await fetch(`http://localhost:3000/api/events?id=${id}`, {
        method: "DELETE",
      })
      router.refresh();
    }
  }

  // const { handleDelete } = useContext(TopicsContext)
  return (
    <button onClick={removeEvent}>

      <FaTrash className='text-red-500 text-4xl' /**onClick={handleDelete} */ />
    </button>
  )
}

export default RemoveBtn