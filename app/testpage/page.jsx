"use client"
import { Container, Grid, Paper, Popover } from '@mui/material'
import React, { useContext } from 'react'
import "./Testpage.css"
import { ThemeContext } from '@/context/ThemeContext';
import { Box, button, Typography } from '@mui/joy';


const TestPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container fixed>
      <Box>
        <Paper>

        </Paper>
      </Box>



      <button aria-describedby={id} variant="contained" onMouseOver={handleClick}>
        Open Popover
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
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