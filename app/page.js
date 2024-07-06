"use client"
import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { getSession } from "next-auth/react"
import { Button } from '@mui/joy'
import Link from 'next/link'

const Home = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState()

  useEffect(() => {
    const fetch = async () => {

      const user = await getSession()

      setUser(user?.user)
    }
    fetch()
  }, [])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateSpeaker = (data, user, speaker) => {


    console.log(speaker)
    console.log(user)

  }
  const handleCreateSponsor = (data, user, df) => {

  }
  return (
    <Container fixed>
      <Link href={"/registration/attendees"}><Button>attendees</Button></Link>
      <Link href={"/registration/speakers"}><Button>speakers</Button></Link>
      <Link href={"/registration/sponsors"}><Button>sponsors</Button></Link>



    </Container>
  )
}


export default Home
