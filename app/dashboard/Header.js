import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
// import button from '@mui/material/button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { AuthContext } from '@/context/AuthContext';


const lightColor = 'rgba(255, 255, 255, 0.7)';

const Header = (props) => {
  const { selectedTab, handleTabChange, onDrawerToggle } = props;
  const { auth, signOutUser } = useContext(AuthContext)

  return (
    <React.Fragment>
      <AppBar color="primary" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Avatar variant="solid" alt="SE" size="sm">
                {auth?.user?.name && auth?.user?.name.substring(0, 1)}

                {/* {users?.firstname && users?.firstname.substring(0, 1) + params.row.lastname.substring(0, 1)} */}
              </Avatar>
            
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </button>
            </Grid>
            <Grid item>      <Tooltip title="Help">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab onClick={() => signOutUser()}label="Sign-out" />
          
          
          <Tab label="Usage" />
        </Tabs>
      </AppBar>

    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
