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
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
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
bgwhite: {
    backgroundColor : '#FCFAFF',
    padding: theme.spacing(2),
    marginBottom : theme.spacing(8),
    boxShadow : '0px 0px 2px black',
},
}));


export default function MesMissionsApp() {
const classes = useStyles();
const userData = JSON.parse(localStorage.getItem('user'));
const [missions, setMissions] = React.useState('');
const [success, setSuccess] = React.useState(false);
const [userMissions, setUserMissions] = React.useState('');
const [cancelSuccess, setCancelSuccess] = React.useState(false);
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

function removeApplyMission(missionId) {

    const applyId = userData.id;
    fetch(`${entrypoint}/api/applies/${missionId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userData.token,
        },
        body: JSON.stringify({
            applyId,
            missionId
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.status === 200) {
                window.location.reload();
                setCancelSuccess(true);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
//console.log(missions)

return (
    <React.Fragment>
    <CssBaseline />
    <main className={classes.canvas}>
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {missions.length === 0 && 
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
            </Grid>
            <Box className={classes.bgwhite}>
            {/* Mission validé*/missions && missions.length >0 &&
            <Typography variant="h5" className={classes.marginb}><p>Missions validées :</p></Typography>
            }
            <Grid container spacing={4}>
            
            {/* Mission validé*/missions && missions.length >0 && missions && missions.map((mission) => (
                  mission.validate === 1 &&<Grid item key={mission.id} xs={12} sm={6} md={4}>
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
                            <Button href={"/mission/fiche/" + mission.mission_id} size="small" color="primary">
                            Voir
                            </Button>
                        </CardActions>

                        </Card>
                    </Grid>
            ))}
        </Grid>
        </Box>
        <Box className={classes.bgwhite}>
        {/* Mission validé*/missions && missions.length >0 &&
            <Typography variant="h5" className={classes.marginb}><p>Missions en attente de validation :</p></Typography>
        }
        <Grid container spacing={4}>
            {/* Mission Attente ou refusé*/missions && missions.length >0 && missions && missions.map((mission) => (
                  mission.validate !== 1 &&<Grid item key={mission.id} xs={12} sm={6} md={4}>
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
                            <Button href={"/mission/fiche/" + mission.mission_id} size="small" color="primary">
                            Voir
                            </Button>
                            <Button onClick={() => (removeApplyMission(mission.id))} size="small" color="primary">
                            Annuler ma mission
                            </Button>
                        </CardActions>

                        </Card>
                    </Grid>
            ))}
        </Grid>
        </Box>
        </Container>
    </main>
    </React.Fragment>
);
}