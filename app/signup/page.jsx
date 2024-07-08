"use client"
import React, { useRef, useState } from 'react'
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
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setData((prev) => ({
      ...prev,
      [name]: value
    }))

  }
  const handleSumbit = async () => {    

    console.log(data);

    // Uncomment the following lines to use the fetch API
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    console.log(response)
    router.replace("/login")
  };

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
            <>

              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleChange}
                value={data?.email}
                name="email"
                type="email"
                placeholder="johndoe@email.com"
              />


              <FormLabel>User Name</FormLabel>
              <Input
                onChange={handleChange}
                value={data?.name}
                name="name"
                type="text"
                placeholder="User Name"
              />


              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                value={data?.password}
                name="password"
                type="password"
                placeholder="password"
              />
              
              <Button onClick={handleSumbit} sx={{ mt: 1 /* margin top */ }}>Sign Up</Button>
              <Typography
                endDecorator={<Link href="/login">Login</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                I have an account.
              </Typography>
            </>
          </Sheet>
        </main>
      </div>
    </Container>
  );
}

export default SignUp;
