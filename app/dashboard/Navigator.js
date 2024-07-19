
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 'Build',
    children: [
      { id: 'Authentication', icon: <PeopleIcon />, active: true },
      { id: 'Users', icon: <DnsRoundedIcon /> },
      { id: 'Events', icon: <PermMediaOutlinedIcon /> },
      { id: 'Topics', icon: <PublicIcon /> },
      { id: 'Speakers', icon: <PhonelinkSetupIcon /> },
      { id: 'Venue', icon: <SettingsEthernetIcon /> },      
    ],
  },
  {
    id: 'Events',
    children: [
      { id: 'Attendees', icon: <SettingsIcon /> },
      { id: 'Sponsors', icon: <TimerIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { setPageComponents, ...other } = props;
  const [activeItem, setActiveItem] = React.useState('Schedule');
  const router = useRouter()

  const handleItemClick = (id) => {
    setActiveItem(id);
    setPageComponents(id);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          King Event Dashboard
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}  onClick={() => router.replace("/kingevents")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: green[500] }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  onClick={() => handleItemClick(childId)}
                  selected={activeItem === childId}
                  sx={item}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={childId}
                    primaryTypographyProps={{
                      color: activeItem === childId ? 'primary' : 'inherit',
                      fontWeight: activeItem === childId ? 'medium' : 'regular',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
