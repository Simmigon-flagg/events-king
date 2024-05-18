import { Box, Container, CssBaseline, Grid } from '@mui/material';
import "./Footer.css";
const Hero = () => {
    return (
        <div className='footer textShadow' >
            <CssBaseline />
            <Container fixed >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={0} >
                            Contact Info:
                        </Grid>
                        <Grid item xs={0} >
                            EventsKing®©
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={0} >
                            Contact:
                        </Grid>
                        <Grid item xs={0} >
                            Kaipher LLC
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={1}  >
                        <Grid className='' item xs={0}   >
                            Email:
                        </Grid>
                        <Grid className='' item xs={0}   >
                            vivalajovy@gmail.com
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={1}  >
                        <Grid className='' item xs={0}   >
                            Phone:
                        </Grid>
                        <Grid className='' item xs={0}   >
                            
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={1}  >
                        <Grid className='' item xs={0}   >
                            Licensing:
                        </Grid>
                        <Grid className='' item xs={0}   >
                            The Licensing
                        </Grid>
                    </Grid>
                </Box>

            </Container>

        </div>



    )
}

export default Hero