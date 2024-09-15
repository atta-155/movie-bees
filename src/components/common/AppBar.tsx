import { Toolbar, Stack, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, alpha, InputBase, styled, Hidden } from "@mui/material";
import React, { useEffect, useState } from 'react';
import logo from '../../assets/MovieBees.png';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import WhiteButton from './WhiteButton';
import TransparentButton from './TransparentButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

const CustomAppBar: React.FC = () => {

    // SearchBar
    const [open, setOpen] = useState(false);
    const handleSearchClick = () => {
        // setOpen(true);
        navigateTo('/search');
    };

    const handleBlur = () => {
        setOpen(false);
    };

    // Drawer
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setMenuOpen(open);
    };
    const navigate = useNavigate();

    const navigateTo = (route: string) => {
        navigate(route);
    };
    return (

        <AppBar position="absolute" sx={{ backgroundColor: 'transparent', boxShadow: 'none', zIndex: 20 }}>
            <Toolbar>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ width: '100%', paddingBlock: 4 }}>

                    <Stack direction={'row'} spacing={0} alignItems={'center'} >
                        <Box sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Box>
                        <img src={logo} alt="logo" style={{ width: '100px', height: '100%' }} />

                    </Stack>

                    {/* Drawer */}
                    <Drawer anchor={'left'} open={menuOpen} onClose={toggleDrawer(false)}
                        sx={{
                            zIndex: 1000,
                        }}>
                        <Box
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                            sx={{
                                // backgroundColor: "black",
                                width: 250,
                                height: "100%",
                                color: "white",
                                backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent background
                                backdropFilter: 'blur(10px)', // Blurs the background
                            }}
                        >

                            <List>
                                <ListItem sx={{ mb: 4 }}>
                                    <img src={logo} alt="logo" style={{ width: '100px', height: '100%' }} />

                                </ListItem>
                                
                                <ListItem disablePadding>

                                    <ListItemButton  onClick={() => navigateTo("/")}>
                                        <ListItemIcon>
                                            <HomeIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                                {/* Discover */}
                                <ListItem disablePadding  onClick={() => navigateTo("/discover")}>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ExploreIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Discover" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                                {/* WatchList */}
                                <ListItem disablePadding  onClick={() => navigateTo("/watch-list")}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PlaylistPlayIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="WatchList" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LoginIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={"Sign In"} />
                                    </ListItemButton>
                                </ListItem>
                            </List>

                        </Box>
                    </Drawer>

                    {/* sx={{ display: { xs: 'none', md: 'flex' } }} */}
                    {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        {!open && (
                            <IconButton onClick={handleSearchClick}>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                        <Collapse in={open} orientation="horizontal" collapsedSize={0}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" aria-label="search" sx={{
                                    width: '100%',
                                    opacity: open ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            </Search>
                        </Collapse>
                    </Box> */}
                     <Hidden mdDown>
                            <List sx={{ display: 'flex', flexDirection: 'row', p: 0 }}>
                                {/* Home */}
                                <ListItem disablePadding>

                                    <ListItemButton onClick={() => navigateTo("/")}>
                                        <ListItemIcon>
                                            <HomeIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="HOME" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                                {/* Discover */}
                                <ListItem disablePadding onClick={() => navigateTo("/discover")}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ExploreIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="DISCOVER" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                                {/* WatchList */}
                                <ListItem disablePadding  onClick={() => navigateTo("/watch-list")}>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PlaylistPlayIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="WATCHLIST" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        </Hidden>
                    <Stack direction={'row'} spacing={2}>
                       
                        <Box >
                            <IconButton onClick={handleSearchClick}>
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" aria-label="search" /> */}
                            {/* </Search> */}
                        </Box>
                        <Stack sx={{ display: { xs: 'none', md: 'flex' } }} spacing={2} direction="row">

                            {/* <WhiteButton text="Login" /> */}
                            <TransparentButton text="Sign in" />
                        </Stack>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default CustomAppBar;