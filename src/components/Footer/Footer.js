import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
return (
    <Typography variant="body2">
    {'Copyright © HACKATHON 2020 - ESGI '}
    
    {'.'}
    </Typography>
);
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: '#23272A',
        color : '#FFFFFF',
    },
    white: {
        color : '#FFFFFF',
    },
    }));

export default function Footer() {
const classes = useStyles();

return (
    <footer className={classes.footer}>
        <Container maxWidth="sm">
        <Typography variant="body2">Réalisé par :
        </Typography>
        <Typography variant="body2">Walid Mouhsin, Muhammad Tounsi, Kosseyla Hammouche, Hugo Chea, Ayman Zair
        </Typography>
        <Copyright className={classes.white}/>
        </Container>
    </footer>
);
}