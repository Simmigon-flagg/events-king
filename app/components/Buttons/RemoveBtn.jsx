"use client"
import React from 'react'
import { FaTrash } from 'react-icons/fa'
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

  return (
    <button onClick={removeTopic}>

      <FaTrash className='text-red-500 text-4xl' />
    </button>
  )
}

export default RemoveBtn