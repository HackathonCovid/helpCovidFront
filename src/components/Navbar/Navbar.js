import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import history from '../../history';

const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 1,
    '&:hover': {
        cursor : 'pointer',
        },
},
}));

export default function Navbar() {
const classes = useStyles();
const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleChange = (event) => {
    setAuth(event.target.checked);
};

const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>

        <Typography variant="h6" className={classes.title} onClick={() => { history.push('/')}}>
        Santé&benev
        </Typography>

        {localStorage.getItem('user') && (
            <div>
            <Button className={classes.buttonhover} color="inherit" href="/">Home</Button>
            <Button className={classes.buttonhover} color="inherit" href="/missions">Nos missions</Button>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { history.push('/profil')}}>Mon profil</MenuItem>
                <MenuItem onClick={() => {history.push('/mesmissions')}}>Mes missions crées</MenuItem>
                <MenuItem onClick={() => {history.push('/mesmissionsbenev')}}>Mes missions de benevolat</MenuItem>
                <MenuItem onClick={() => {history.push('/changerMdp')}}>Changer mon mot de passe</MenuItem>
                <MenuItem onClick={() => { localStorage.removeItem('user'); history.push('/'); } }>Se déconnecter</MenuItem>
            </Menu>
            </div>
        )}
        {!localStorage.getItem('user') && (
            <div>
            <Button className={classes.buttonhover} color="inherit" href="/">Accueil</Button>
            <Button className={classes.buttonhover} color="inherit" href="/register/benevole">Devenir bénévole</Button>
            <Button className={classes.buttonhover} color="inherit" href="/register/soignant">J'ai une mission</Button>
            <Button color="inherit" href="/missions">Nos missions</Button>
            <Button color="inherit" href="/login">Login</Button>
            </div>
        )}
        
        </Toolbar>
    </AppBar>
    </div>
);
}
