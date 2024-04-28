import React from 'react';
import { AppBar, Toolbar, IconButton, Box, SvgIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';

function MenuBar() {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    {/* Left icon */}
                    <IconButton
                        color="inherit"
                        aria-label="home"
                        sx={{ fontSize: 'large' }}
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <HomeIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>

                    {/* Center icon with circle outline */}
                    <Box sx={{ position: 'relative', marginBottom: '15px' }}>
                        <SvgIcon sx={{ fontSize: '4rem', color: 'primary.main' }}>
                            <circle cx="24" cy="24" r="22" fill="white" stroke="#5fb2c9" strokeWidth="2" />
                        </SvgIcon>
                        <IconButton
                            color="inherit"
                            aria-label="add"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                margin: 'auto',
                                fontSize: 'large',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <AddCircleOutlineIcon sx={{ fontSize: '3rem' }} />
                        </IconButton>
                    </Box>

                    {/* Right icon */}
                    <IconButton
                        color="inherit"
                        aria-label="statistics"
                        sx={{ fontSize: 'large' }}
                        onClick={() => {
                            // Handle statistics icon action
                        }}
                    >
                        <BarChartIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;
