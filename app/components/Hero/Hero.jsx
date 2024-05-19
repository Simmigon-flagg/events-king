import React from 'react'
import "./Hero.css"
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import Carousel from '../Carousel/Carousel';
const Hero = () => {
    return (
        <div className='hero'>

            {/* <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} padding={1} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} >
                    <Grid item xs={0} style={{ color: "black", fontSize: 50 }} >
                        Events King
                    </Grid>

                </Grid>
            </Box> */}
           
              <Carousel />
            



        </div>



    )
}

export default Hero