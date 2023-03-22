import react, { useState, useContext } from 'react'
import { SpeedDial, SpeedDialIcon, SpeedDialAction, AppBar, Menu, MenuItem, Toolbar, IconButton, Grid, Box, Paper, Card, CardActions, CardMedia, Button, CardContent, Typography, Stack, createTheme } from '@mui/material'
import { GridCmp } from './GridCmp'
import { useNavigate } from 'react-router-dom';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from '@mui/icons-material';
import { UserContext } from "./Usercontext";
import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import GridCmpGrp from './GridCmpGrp';
import TimelineIcon from '@mui/icons-material/Timeline';

export const Home = () => {
    const navigate = useNavigate();
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget) //sets button el as anchor el
    }
    const open = Boolean(anchor)
    const handleAnchor = () => {
        setAnchor(null)
    }
    const userContext = useContext(UserContext)

    console.log(userContext.user)
    const Logout = () => {
        userContext.setUser(null)
        navigate("/")
    }

    return (
        <Box>
            <AppBar color='inherit' sx={{ margin: '40' }}>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit'>
                        <LandscapeIcon />
                    </IconButton>
                    <Typography variant='h5' component='div' sx={{ flexGrow: 1, fontFamily: 'fantasy' }}></Typography>
                    <Stack direction='row' spacing={2} >
                        <Button color='inherit' sx={{ fontFamily: 'fantasy' }}>Catalog</Button>
                        <Button color='inherit' sx={{ fontFamily: 'fantasy' }}>Pricing</Button>
                        <Button color='inherit' sx={{ fontFamily: 'fantasy' }} aria-label='reources-btn' onClick={handleChange}
                            aria-controls={open ? 'resources-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            endIcon={<ExpandMoreIcon />}>Features</Button>


                        <Button sx={{ fontFamily: 'fantasy' }} color='secondary' variant='outlined' onClick={() => Logout()} endIcon={<LogoutIcon />}> Logout</Button>
                        {/* <Button  color='inherit' startIcon={<Person2Icon/>} endIcon={<ExpandMoreIcon />}></Button> */}
                    </Stack>
                    <Menu aria-label='resources-menu' anchorEl={anchor} open={open} onClose={handleAnchor} >
                        <MenuItem onClick={() => { navigate('/edit') }}> Edit Profile</MenuItem>
                        {/* <MenuItem onClick={() => { navigate('/editProfile') }}> Edit Profile</MenuItem> */}
                        <MenuItem onClick={() => { navigate('/log') }}> Users log</MenuItem>
                        <MenuItem onClick={() => { navigate('/hc') }}> Sales </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid sx={{ padding: '40px' }} container rowSpacing={1} columnSpacing={2}>
                <GridCmpGrp /><GridCmpGrp /><GridCmpGrp />
            </Grid>
            <SpeedDial color='inherit' ariaLabel='nav speed dial' sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}>
                <SpeedDialAction icon={<EditIcon />} onClick={() => { navigate('/edit') }} tooltipTitle='Edit profile' />
                <SpeedDialAction icon={<StorageIcon />} onClick={() => { navigate('/log') }} tooltipTitle='Users Log' />
                <SpeedDialAction icon={<LogoutIcon />} onClick={() => { navigate('/') }} tooltipTitle='Logout' />
                <SpeedDialAction icon={<TimelineIcon />} onClick={() => { navigate('/hc') }} tooltipTitle='Sales' />

            </SpeedDial>

        </Box>
    )
}
