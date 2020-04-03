import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import history from '../../history';
import {entrypoint} from "../../entrypoint";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
icon: {
    marginRight: theme.spacing(2),
},
canvas: {
    minHeight : '91vh',
},
cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
},
card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
},
cardMedia: {
    paddingTop: '56.25%', // 16:9
},
cardContent: {
    flexGrow: 1,
},
footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
},
}));


export default function MesMissionsApp() {
const classes = useStyles();
const [missions, setMissions] = React.useState('');
const [success, setSuccess] = React.useState(false);
const id = React.useState(JSON.parse(localStorage.getItem('user')).id);
const author_id = id[0];

const user = JSON.parse(localStorage.getItem("user"));

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSuccess(false);
};

useEffect(() => {
    fetch(`${entrypoint}/api/userapplies/${author_id}`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setMissions(data.response));
},[author_id])


return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.canvas}>
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
            {missions.length == 0 && 
                <Typography variant="h5" className={classes.marginb}><p>Vous n'avez pas encore de mission !</p>
                <p>Si vous souhaitez participer à la lutte contre le Covid-19, cette plateforme est pour vous ;)</p></Typography>
            }
            {missions.length >0 && missions && missions.map((mission) => (
            <Grid item key={mission.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="img.jpg"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {mission.mission.title}
                    </Typography>
                    <Typography>
                    {mission.mission.description}
                    </Typography>
                    <Typography>
                    Nombre personnes : {mission.mission.nb_people_required}
                    </Typography>
                    <Typography>
                    Compétences requises : {mission.mission.skills_required}
                    </Typography>
                    <Typography>
                    Jour ou nuit : {mission.mission.night_or_day}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={"/mission/fiche/" + mission.id} size="small" color="primary">
                    Voir
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </main>
    </React.Fragment>
);
}