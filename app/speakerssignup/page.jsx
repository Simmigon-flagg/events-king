"use client"
import React, { useEffect, useState } from 'react'
import { Container, Dialog, DialogContentText } from '@mui/material'
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import { DialogActions, DialogContent, DialogTitle, Input } from '@mui/joy';
import { getSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState()
  const router = useRouter()

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

  const handleCreateSpeaker = async (data, user) => {
    console.log(data)
    const speaker = {
      ...user,
      ...data
      
    }
    console.log(speaker)
    // 
    await fetch("/api/speakers", {
      method: "POST",
      data: JSON.stringify(data)
    })
    
    router.refresh();
    
  }
  return (
    <Container fixed>

      <div className='login'>

        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Speaker
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                handleCreateSpeaker(formJson, user)               
                handleClose();
              },
            }}
          >
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
              {/* 
              firstname: String,
              lastname: String,
              email: String,
              title: String,
              phone: String,
              aboutme: String,
              company: String,
              description: String,
              presentation: String,
              topics:
              image:
               */}
              <Input
                autoFocus
                // required
                
                margin="dense"
                id="firstname"
                name="firstname"
                label="firstname Name Address"
                type="text"
                // fullWidth
                defaultValue={"first names"}
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="lastname"
                name="lastname"
                label="lastname Name Address"
                type="text"
                defaultValue={"last names"}
                // fullWidth
                variant="standard"
                />
   
              <Input
                autoFocus
                // required
                margin="dense"
                id="title"
                name="title"
                label="title Name Address"
                type="text"
                defaultValue={"title"}
                
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="phone"
                name="phone"
                label="phone Name Address"
                defaultValue={"6787900353"}
                type="text"
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="company"
                name="company"
                label="company Name"
                type="text"
                defaultValue={"company"}
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="aboutme"
                name="aboutme"
                label="aboutme"
                type="text"
                defaultValue={"aboutme"}
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="company"
                name="company"
                label="company Name Address"
                type="text"
                defaultValue={"company"}
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="description"
                name="description"
                label="description Name Address"
                type="text"
                defaultValue={"description"}
                // fullWidth
                variant="standard"
                />
              <Input
                autoFocus
                // required
                margin="dense"
                id="presentation"
                name="presentation"
                label="presentation Name Address"
                defaultValue={"presentation"}
                type="text"
                // fullWidth
                variant="standard"
              />


            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog> 
        </React.Fragment>

      </div>
    </Container>
  )
}

export default Login