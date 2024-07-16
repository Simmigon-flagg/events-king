"use client";

import React, { useContext, useState } from 'react';
import "./Login.css";
// import Sheet from '@mui/joy/Sheet';
// import Typography from '@mui/joy/Typography';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
// import button from '@mui/joy/button';
// import Link from '@mui/joy/Link';
import { getSession, signIn } from "next-auth/react";
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UsersContext } from '@/context/UsersContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: "da@gmail.com", password: "admin123" });
  const [error, setError] = useState(null);
  const { users, setUsers } = useContext(UsersContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (!response || response.error) {
      setError(response?.error || "Failed to sign in");
      return;
    }

    const data = await getSession();
    if (data && data.user) {
      try {
        const res = await fetch(`/api/users/${data.user.id}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const applicationData = await res.json();
        setUsers((prev) => ({
          ...prev,
          user: applicationData.user
        }
          
          ));
        

        router.push("/");
      } catch (error) {
        setError(error.message);
        console.error("Fetch user data error: ", error);
      }
    }
  };

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
                <b>Welcome!</b>
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
            {error && <Typography color="error">{error}</Typography>}
            <Typography
              endDecorator={<Link href="/signup">Sign up</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              Don&apos;t have an account?
            </Typography>
          </Sheet>
        </main>
      </div>
    </Container>
  );
};

export default Login;
