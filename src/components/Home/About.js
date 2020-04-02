import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        minHeight : '50vh',
    },
    delimit: {
        minHeight : '20vh',
    },
    center: {
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1),
    },
    bgred: {
        backgroundColor : '#ec2F4B',
    },
    bgblue: {
        backgroundColor : '#009FFF',
    },
    fwhite: {
        color : 'white',
    },
    benevol: {
        backgroundImage: 'url(benevol.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    scientist: {
        backgroundImage: 'url(scientist.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    }));

export default function About() {
const classes = useStyles();
    
return (
<div className={classes.root}>
<CssBaseline />

<Grid container component="delimit" className={classNames(classes.delimit, classes.center)}>
    
    <Grid container item xs={12} sm={12} md={12} direction="row" justify="center" alignItems="center" className={classes.bgblue}>
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom className={classes.fwhite}>
            {'Nous avons besoin d\'aide !'}
            </Typography>
        </Container>
    </Grid>

</Grid>

<Grid container component="main" className={classNames(classes.main, classes.center)}>
    <Grid container item xs={12} sm={8} md={6} direction="row" justify="center" alignItems="center">
    <Container maxWidth="sm">
        <Typography variant="h5" component="h2" gutterBottom>
        {'Besoin d\'un coup de pouce ?'}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
        {'Tout un peuple derrière son système médical dans la lutte contre le Covid-19'}
        </Typography>
        <Typography variant="body1" className={classes.margin}>Annoncer la mission sur laquelle vous avez besoin d'aide et entrer en contact avec les bénévoles qui sont intéressés.</Typography>
        {localStorage.getItem('user') && (
        <Grid container direction="row" justify="center" alignItems="center">
            <Button href="/mission/add" variant="contained" size="small" color="primary" className={classNames(classes.margin, classes.padding)}>
            je recherche des bénévoles !
            </Button>
        </Grid>
        )}
        {!localStorage.getItem('user') && (
        <Grid container direction="row" justify="center" alignItems="center">
            <Button href="/register/soignant" variant="contained" size="small" color="primary" className={classNames(classes.margin, classes.padding)}>
            je recherche des bénévoles !
            </Button>
        </Grid>
        )}
    </Container>
    </Grid>
    <Grid item xs={false} sm={4} md={6} className={classes.scientist} />
</Grid>

<Grid container component="delimit" className={classNames(classes.delimit, classes.center)}>
    
    <Grid container item xs={12} sm={12} md={12} direction="row" justify="center" alignItems="center" className={classes.bgred}>
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom className={classes.fwhite}>
            {'Je veux devenir bénévole !'}
            </Typography>
        
        </Container>
    </Grid>

</Grid>

<Grid container component="main" className={classNames(classes.main, classes.center)}>
    <Grid item xs={false} sm={4} md={6} className={classes.benevol} />
    <Grid container item xs={12} sm={8} md={6} direction="row" justify="center" alignItems="center">
    <Container maxWidth="sm">
    <Typography variant="h5" component="h2" gutterBottom>
    {'C\'est simple, il suffit de s\'inscrire en tant que bénévole pour avoir accès à la liste des missions les plus proches de chez vous.'}
    </Typography>
    <Typography variant="body1" className={classes.margin}>Choisissez les missions qui vous correspondent le mieux et entrer en contact avec le corps soignant ayant besoin de votre aide !</Typography>
    {localStorage.getItem('user') && (
    <Grid container direction="row" justify="center" alignItems="center">  
        <Button href="/missions" variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
        je veux devenir bénévole !
        </Button>
    </Grid>
    )}
    {!localStorage.getItem('user') && (
    <Grid container direction="row" justify="center" alignItems="center">
        <Button href="/register/benevole" variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
        je veux devenir bénévole !
        </Button>
    </Grid>
    )}
    
    
    </Container>
    </Grid>

</Grid>
</div>
);
}