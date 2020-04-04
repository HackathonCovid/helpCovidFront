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
root: {
    minWidth: 275,
    margin: 'auto',
},
title: {
    fontSize: 14,
},
pos: {
    marginBottom: 12,
},
}));


export default function MesMissions() {
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
    fetch(`${entrypoint}/api/user_missions/${author_id}`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setMissions(data.response));
},[author_id])
function deleteMission(idm) {
    fetch(`${entrypoint}/api/missions/${idm}` , {
    method: 'DELETE',
    headers: {
        'authorization': 'Bearer '+ user.token,
    },
    })
    .then((resp) => resp.json())
    .then((data) => {
    if(data) {
        //console.log(missions)
       // setSuccess(true);
       for(let i = 0; i< missions.length; i++){
        if(missions[i].id === idm){
            missions.splice(i, 1);
            setMissions(missions)
        }
    }
    }
    })
    .then((data) => setMissions(data));
}

function editMission(idm) {
    localStorage.setItem('missionId', idm);
    history.push('/mission/update');
}

//console.log(missions)

return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.canvas}>
        <Container className={classes.cardGrid} maxWidth="md">
        { success &&
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Mission supprimé !
                </Alert>
            </Snackbar>
         }
        <Grid container spacing={4}>
            {missions === undefined && 
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Aucune mission
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Si vous souhaitez participer à la lutte contre le Covid-19, <br />
                            cette plateforme est faite pour vous !
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href="/missions">Nos missions</Button>
                    </CardActions>
                </Card>
            }
            {missions && missions.length > 0 && missions.map((mission) => (
            <Grid item key={mission.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="img.jpg"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {mission.title}
                    </Typography>
                    <Typography>
                    {mission.description}
                    </Typography>
                    <Typography>
                    Nombre personnes : {mission.nb_people_required}
                    </Typography>
                    <Typography>
                    Compétences requises : {mission.skills_required}
                    </Typography>
                    <Typography>
                    Jour ou nuit : {mission.night_or_day}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={"/mission/fiche/" + mission.id} size="small" color="primary">
                    Voir
                    </Button>
                    <Button size="small" color="primary" onClick={() => {editMission(mission.id)}}>
                    Modifier
                    </Button>
                    <Button size="small" color="primary" onClick={() => {deleteMission(mission.id)}}>
                    Supprimer
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