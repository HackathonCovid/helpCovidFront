import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { useParams } from "react-router-dom";
import CommentaireMission from './CommentaireMission';


import {entrypoint} from "../../entrypoint";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '91vh',
    },
    main: {
        //minHeight : '50vh',
    },
    margin: {
        margin: theme.spacing(1),
    },
    padding: {
        padding: theme.spacing(1),
    },
    margint2: {
        marginTop : theme.spacing(2),
    },
    center: {
        textAlign: 'center',
    },
    }));

export default function About() {
    
const classes = useStyles();
const [mission, setMission] = React.useState('');
const [fetched, setFetched] = React.useState(false);
const [author, setAuthor] = React.useState('');
let { id } = useParams();

const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

useEffect(() => {
    if(!fetched) {
    fetch(`${entrypoint}/api/missions/${id}`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setMission(data.response) && setAuthor(data.response.author));
}
}, [id])

console.log(mission);
console.log(author);
return (
<div className={classes.root}>
<CssBaseline />
<Grid container component="main" className={classes.main}>
    
    <Container maxWidth="md">
    
        <Card className={classNames(classes.main, classes.margint2)}>
            <CardContent>
                <Typography variant="h2" component="h1" gutterBottom className={classNames(classes.blue, classes.center)}>
                {mission.title}
                </Typography>
                <Typography variant="body1">
                Responsable : {mission.author_id}
                </Typography>
                <Typography variant="body1">
                Crée le : {mission.created_at != null && mission.created_at.substr(0, 10)}
                </Typography>
                <Typography variant="body1">
                Durée : {mission.nb_days} jour(s)
                </Typography>
                <Typography variant="body1">
                Adresse : {mission.address_hospital}
                </Typography>
                <Typography variant="body1">
                Nombre de bénévoles souhaité(s) : {mission.nb_people_required}
                </Typography>
                <Typography variant="body1">
                De nuit : {mission.night_or_day == "Day" && <strong>Non</strong>} {mission.night_or_day == "Night" && <strong>Oui</strong>}
                </Typography>
                <Typography variant="body1">
                Compétence requise ? : {mission.skills_required}
                </Typography>
                <Typography variant="body1">
                Description :
                </Typography>
                <Typography variant="body1">
                {mission.description}
                </Typography>
                
            </CardContent>
            <CardActions className={classNames(classes.margin, classes.padding, classes.center)}>
            <Button variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
            Je postule !
            </Button>
            </CardActions>
        </Card>

        <CommentaireMission/>
    
    </Container>

</Grid>
    
</div>
);
}