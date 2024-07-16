"use client"
import React, { useState } from 'react'
import SpeakersList from '../components/AllSpeakersList/AllSpeakersList'
import { button, Container, FormControl, Input, Sheet, Typography } from '@mui/joy'
import { FormLabel } from '@mui/material'
import Link from 'next/link'

const SpeakerSignUp = () => {
  const [formData, setFormData] = useState({ email: "da@email.com", password: "admin123" });

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async () => {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/speakerdashboard"

    })

    if (!response || response.error) {
      setError(response?.error || "Failed to sign in");
    }
  }
  return (
    <Container fixed>

      <div className='login'>
        <main>
          <Sheet
            sx={{
              width: 300,
              mx: 'auto', // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                <b>Welcome Speaker!</b>
              </Typography>
              <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input

                onChange={handleChange}
                name="email"
                type="email"
                value={formData.email}
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input

                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                placeholder="password"
              />
            </FormControl>
            <button onClick={handleSubmit} sx={{ mt: 1 /* margin top */ }}>Log in</button>
            <Typography
              endDecorator={<Link href="/speakerssignup">Speaker Sign up</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              Don&apos;t have an account?
            </Typography>
          </Sheet>
        </main>
      </div>
    </Container>
  )
}

export default SpeakerSignUp