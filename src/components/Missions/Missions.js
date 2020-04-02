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
const [missions, setMissions] = React.useState('');
const isv = React.useState(JSON.parse(localStorage.getItem('user')).is_volunteer);
const is_volunt = isv[0];

useEffect(() => {
    fetch(`${entrypoint}/api/missions`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setMissions(data.response));
},[missions.id]);

return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
        {is_volunt == 0 &&
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
                    image="benevol.jpg"
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
                    <Typography gutterBottom>
                    {mission.description.length > 60 && mission.description.substr(0, 60)}
                    {mission.description.length < 61 && mission.description}
                    </Typography>

                    <Typography variant="h6" component="h2" className={classNames(classes.borderT)}>
                    {'Détails'}
                    </Typography>
                    <Typography>
                    Durée : {mission.nb_days} jour(s)
                    </Typography>
                    <Typography>
                    Compétences requises : {mission.skills_required}
                    </Typography>
                    <Typography>
                    Mission de  {mission.night_or_day == "Day" && <strong>Jour</strong>} {mission.night_or_day == "Night" && <strong>Nuit</strong>}
                    </Typography>
                    <Typography variant="body2" className={classNames(classes.italic, classes.right, classes.note)}>
                    Postée le : {mission.created_at != null && mission.created_at.substr(0, 10)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={"/mission/fiche/" + mission.id} size="small" color="primary">
                    Voir
                    </Button>
                    <Button size="small" color="primary">
                    Postuler
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </main>
    {is_volunt == 0 &&
    <Fab onClick= {() =>(history.push('/mission/add'))} color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
        </Fab>
    }
    </React.Fragment>
);
}