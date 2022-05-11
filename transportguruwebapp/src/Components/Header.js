import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Images from '../Contents/Images';
import colors from "../Contents/colors";



import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const pages = ['TrasportList', 'Transport Guru Account', 'Tracking', 'Message'];
const settings = ['Edit Profile', 'Transport Guru Account', 'Privacy Policy', 'Terms of service', 'Support', 'LogOut'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [state, setState] = React.useState({})
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <AppBar position="fixed" sx={{ backgroundColor: colors.primaryColors}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={Images.icon} alt="" width={180} height={80} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, position: 'fixed', bottom: 0 }}>
                        <BottomNavigation value={value} onChange={handleChange}>
                            <BottomNavigationAction
                                label="Home"
                                value="Home"
                                icon={<RestoreIcon />}
                            />
                            <BottomNavigationAction
                                label="Transport List"
                                value="Transport List"
                                icon={<FavoriteIcon />}
                            />
                            <BottomNavigationAction
                                label="Tracking"
                                value="Tracking"
                                icon={<LocationOnIcon />}
                            />
                            <BottomNavigationAction
                                label="Message"
                                value="Message"
                                icon={<FolderIcon />} />
                        </BottomNavigation>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={Images.icon} alt="" width={100} height={80} />
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center'
                    }}>
                        {pages.map((page) =>
                        (<Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ color: 'white', display: 'block', marginRight: 5 }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }} onClick={toggleDrawer('right', true)} >
                                <Avatar alt="Remy Sharp" src={Images.transport} />
                                <Typography sx={{ color: 'white', mt: 1 }}>
                                    Arjun Chaudhary
                                </Typography>
                            </Box>
                        </Tooltip>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            <Box
                                sx={{ width: 'right' === 'top' || 'right' === 'bottom' ? 'auto' : 300 }}
                                role="presentation"
                                onClick={toggleDrawer('right', false)}
                                onKeyDown={toggleDrawer('right', false)}
                            >
                                <List >
                                    <Box sx={{
                                        backgroundColor: colors.primaryColors,
                                        height: 250,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar alt="Aemy Sharp" src={Images.transport}
                                            sx={{ width: 180, height: 180 }} />
                                        <Typography sx={{ color: 'white', mt: 1 }}>
                                            Arjun Chaudhary
                                        </Typography>
                                        <Typography sx={{ color: 'black', fontSize: 12 }}>
                                            arjun910661@gmail.com
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {settings.map((text, index) => (
                                            <ListItem key={text} disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={text} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </Box>
                                </List>
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container >
        </AppBar >
    )
}
export default Header
