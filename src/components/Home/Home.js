import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '91vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    center: {
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginb: {
        marginBottom: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1),
    },
    logo:{
        backgroundImage: 'url(/public/logo.png)'
    },
    blue:{
        color : '#009FFF',
    },
    }));

export default function Home() {
const classes = useStyles();
    
return (
<div className={classes.root}>
<CssBaseline />
<Container component="main" className={classNames(classes.main, classes.center)} maxWidth="sm">
    <img src="logo.png" alt="logo"/>
    <Typography variant="h2" component="h1" gutterBottom className={classes.blue}>
    HOPIT & BENEV
    </Typography>
    <Typography variant="h5" component="h2" gutterBottom>
    {'Soyons tous ensemble contre le Covid-19 !'}
    </Typography>
    <Typography variant="body1" className={classes.marginb}>Hopit & Benev permet de faire la liaison entre le volontaire bénévole et les systèmes de santé qui ont besoin d'aide dans la lutte contre le Covid-19</Typography>
    {localStorage.getItem('user') && (
    <Grid container direction="row" justify="center" alignItems="center">
        <Grid container item xs={6} spacing={1} direction="row" justify="center" alignItems="center">
            <Button href="/mission/add" variant="contained" size="small" color="primary" className={classNames(classes.margin, classes.padding)}>
            je recherche des bénévoles !
            </Button>
        </Grid>
        <Grid container item xs={6} spacing={1} direction="row" justify="center" alignItems="center">
            <Button href="/missions" variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
            je veux devenir bénévole !
            </Button>
        </Grid>
    </Grid>
    )}
    {!localStorage.getItem('user') && (
    <Grid container direction="row" justify="center" alignItems="center">
        <Grid container item xs={6} spacing={1} direction="row" justify="center" alignItems="center">
            <Button href="/register/soignant" variant="contained" size="small" color="primary" className={classNames(classes.margin, classes.padding)}>
            je recherche des bénévoles !
            </Button>
        </Grid>
        <Grid container item xs={6} spacing={1} direction="row" justify="center" alignItems="center">
            <Button href="/register/benevole" variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
            je veux devenir bénévole !
            </Button>
        </Grid>
    </Grid>
    )}
    
</Container>

</div>
);
}