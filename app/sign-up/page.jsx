"use client"
import React from 'react'
import "./Sign-up.css"
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { Container } from '@mui/material';

const Login = () => {
  return (
    <Container fixed>

      <div className='login'>
        <main>

          <CssBaseline />
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
                <b>Welcome!</b>
              </Typography>
              <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                // html input attribute
                name="username"
                type="text"
                placeholder="User Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
              />
            </FormControl>
            <Button sx={{ mt: 1 /* margin top */ }}>Sign Up</Button>
            <Typography
              endDecorator={<Link href="/login">Login</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              I have an account.
            </Typography>
          </Sheet>
        </main>

      </div>
    </Container>
  )
}

export default Login