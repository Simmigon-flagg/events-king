"use client"
import React, { useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Content from './Content';
import Content2 from './Content2';
import NotFound from './NotFound';
import Header from './Header';
import AllUsersList from '../components/AllUsersList/AllUsersList';
import AllEventsList from '../components/AllEventsList/AllEventsList';
import AllTopicsList from '../components/AllTopicsList/AllTopicsList';
import AllSpeakersList from '../components/AllSpeakersList/AllSpeakersList';
import AllAttendeesList from '../components/AllAttendeesList/AllAttendeesList';
import AllSponsorsList from '../components/AllSponsorsList/AllSponsorsList';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [pageComponents, setPageComponents] = useState()
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { auth, signOutUser } = useContext(AuthContext)

  const handleTabChange = (event, newValue) => {
    console.log(event)
    setSelectedTab(newValue);
  };

  const renderComponent = () => {

    switch (pageComponents) {
      case 'Authentication':
        return <Content />;
      case 'Users':
        return <AllUsersList />;
      case 'Events':
        return <AllEventsList />;
      case 'Topics':
        return <AllTopicsList />;
      case 'Speakers':
        return <AllSpeakersList />;
      case 'Attendees':
        return <AllAttendeesList />;
      case 'Sponsors':
        return <AllSponsorsList />;
      // case 'Venue':
      //   return <Content2 />;

    }
    switch (selectedTab) {
      case 0:
        return <Typography variant="body1">  {`Welcome to King event's, ${auth?.user?.firstname || auth?.user?.name}!`}</Typography>;
      case 1:
        return <Typography variant="body1">Sign-in method content</Typography>;
      case 2:
        return <Typography variant="body1">Templates content</Typography>;
      case 3:
        return <Typography variant="body1">Usage content</Typography>;
      default:
        return <NotFound />;
    }
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              onClick={handleDrawerToggle}
              setPageComponents={setPageComponents}
            />
          )}

          <Navigator setPageComponents={setPageComponents} PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} selectedTab={selectedTab} handleTabChange={handleTabChange} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {renderComponent()}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
