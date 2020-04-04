import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';

import history from '../../history';
import {entrypoint} from "../../entrypoint";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
center: {
    textAlign: 'center',
},

blue:{
    color : '#009FFF',
},
italic:{
    fontStyle : 'italic',
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
bgred: {
    backgroundColor : '#ec2F4B',
    color : 'white',
},
right: {
    textAlign : 'right',
},
borderT:{
    borderTop : "1px solid red",
},
icon: {
    marginRight: theme.spacing(2),
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
align: {
display: 'flex',
'align-items': 'center',
'justify-content': 'center',
},
margin: {
position: 'fixed',
bottom: '1%',
right: '1%',
'z-index': '9999',
},
btnMission: {
    'margin-bottom': theme.spacing(3),
},
}));


export default function Missions() {
const classes = useStyles();
const userData = JSON.parse(localStorage.getItem('user'));
const [missions, setMissions] = React.useState('');
const usrS = React.useState(JSON.parse(localStorage.getItem('user')))
const isv = (usrS[0]!= undefined)?usrS[0].is_volunteer :undefined;
const is_volunt = (isv)? isv[0]:undefined ;
const [applySuccess, setApplySuccess] = React.useState(false);
const [cancelSuccess, setCancelSuccess] = React.useState(false);
const [userMissions, setUserMissions] = React.useState('');
const renderPostulerButton = (missionId, userMissions) => {
    for(let i = 0 ; i < userMissions.length; i++){
        if(userMissions[i].mission_id === missionId){
            return(
                <Button size="small" color="primary" onClick={() => (removeApplyMission(userMissions[i].id, i))}>
                    Annuler ma mission
                </Button>
            )
        }
    }
    return(
        <Button size="small" color="primary" onClick={() => (applyMission(missionId))}>
            Postuler
        </Button>
    )
};


const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setApplySuccess(false);
};
let   isvolunt = false;
if(isv == 0){
    isvolunt = true;
    //console.log(isvolunt);
}

useEffect(() => {
    fetch(`${entrypoint}/api/missions`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setMissions(data.response));
},[missions.id]);

function calculateDateDuration(departDate, endDate){
    const date1 = new Date(departDate.substr(0,10));
    const date2 = new Date(endDate.substr(0,10));
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
    useEffect(() => {
        fetch(`${entrypoint}/api/missions`,{
        method : 'GET'
        })
        .then((resp) => resp.json())
        .then((data) => setMissions(data.response));
    },[missions.id]);

    useEffect(() => {
        if(localStorage.getItem('user')){
            fetch(`${entrypoint}/api/userapplies/${userData.id}`,{
                method : 'GET'
            })
                .then((resp) => resp.json())
                .then((data) => setUserMissions(data.response));
        }
    },[]);

    function applyMission(missionId) {

        const applyId = userData.id;
        fetch(`${entrypoint}/api/applies/${missionId}`, {
            method: 'POST',
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
                if(data.status === 201) {
                    window.location.reload();
                    setApplySuccess(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function removeApplyMission(missionId, i) {

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
                  //  window.location.reload();
                   // setCancelSuccess(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
        {isvolunt &&
        <Grid container direction="row" justify="end" alignItems="end">
            <Button href="/mission/add" className={classes.btnMission} variant="contained" size="medium" color="primary">
            Créer une mission
            </Button>
        </Grid>
    }
        <Grid container spacing={4}>
            {missions && missions.map((mission) => (
            <Grid item key={mission.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardHeader className={classes.bgred}
                    title= {mission.title}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="img.jpg"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography className={classNames(classes.align, classes.marginb)}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid container item xs={3} direction="row" justify="center" alignItems="center">
                            <Avatar src="/broken-image.jpg"/>
                        </Grid>
                        <Grid container item xs={9} direction="row" justify="left" alignItems="center">
                            Contact : {mission.author.firstname} {mission.author.lastname}
                        </Grid>
                    </Grid>
                    </Typography>
                    <Typography variant="h6" component="h2">
                    {'Description :'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    {mission.description.length > 120 && mission.description.substr(0, 120) + "..."}
                    {mission.description.length < 121 && mission.description}
                    </Typography>

                    <Typography variant="h6" component="h2" className={classNames(classes.borderT)}>
                    {'Détails'}
                    </Typography>
                    <Typography>
                    Durée : {/*mission.nb_days*/}{calculateDateDuration(mission.start_date, mission.end_date)} jour(s)
                    </Typography>
                    <Typography>
                    Compétences requises : {mission.skills_required}
                    </Typography>
                    <Typography>
                    Mission de <strong>{mission.night_or_day != null && mission.night_or_day.toLowerCase()}</strong>
                    </Typography>
                    <Typography variant="body2" className={classNames(classes.italic, classes.right, classes.note)}>
                    Postée le : {mission.created_at != null && mission.created_at.substr(0, 10)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={"/mission/fiche/" + mission.id} size="small" color="primary">
                    Voir
                    </Button>
                    {localStorage.getItem('user') &&  userMissions &&
                        renderPostulerButton(mission.id, userMissions)
                    }
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        <Snackbar open={applySuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Inscription réussie
            </Alert>
        </Snackbar>
        <Snackbar open={cancelSuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Inscription annulée
            </Alert>
        </Snackbar>
        </Container>
    </main>
    {isvolunt &&
    <Fab onClick= {() =>(history.push('/mission/add'))} color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
        </Fab>
    }
    </React.Fragment>
);
}