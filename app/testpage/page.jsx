"use client"
import {  Container, Grid } from '@mui/material'
import React, { useContext } from 'react'
import "./Testpage.css"
import { ThemeContext } from '@/context/ThemeContext';

const TestPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Container fixed>

    <Grid className='testpage'>
      <div className={`app ${theme}`}>
        <header className="app-header">
          <h1>Welcome to React Dark Mode</h1>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </header>
      </div>
    </Grid>
    </Container>
  )
}

export default TestPage