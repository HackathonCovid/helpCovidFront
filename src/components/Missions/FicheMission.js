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
import Avatar from '@material-ui/core/Avatar';
import CommentaireMission from './CommentaireMission';
import AdminApplyant from './AdminApplyant';


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
    margint3: {
        marginTop : theme.spacing(4),
    },
    center: {
        textAlign: 'center',
    },
    bgred: {
        backgroundColor : '#ec2F4B',
        color : 'white',
    },
    justify: {
        textAlign : 'justify',
    },
    }));

export default function FicheMission() {
    
const classes = useStyles();
const [mission, setMission] = React.useState('');
const [fetched, setFetched] = React.useState(false);
const [appliants, setAppliant] = React.useState('');
const [author, setAuthor] = React.useState('');
let { id } = useParams();
const user = JSON.parse(localStorage.getItem("user"));
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

function lowerCase(wordLower){
    var str = '' + wordLower;
    return str.toLowerCase();
}

function calculateDateDuration(departDate, endDate){
    if (departDate != null && endDate != null){
        const date1 = new Date(departDate.substr(0,10));
        const date2 = new Date(endDate.substr(0,10));
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        return diffDays;
    }
    
}


const renderPostulerButton = () => {
    for(let i = 0 ; i < appliants.length; i++){
        if(appliants[i].user_id === user.id){
            return(
                <div></div>
            )
        }
    }
    return(
        <Button onClick={ elemnt => {postuler(elemnt,mission.id)}} variant="contained" size="small" color="secondary" className={classNames(classes.margin, classes.padding)}>
            Je postule !
        </Button>
    )
};

const postuler = (element, id) =>{

    element.currentTarget.style.backgroundColor = "green";
    element.currentTarget.style.display = "none";
    fetch(`${entrypoint}/api/applies/${id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+ user.token,
        },
        })
        .then((response) => response.json())
        .then((data) => {
        if(data.response.hasOwnProperty('author_id')) {
            
        }
        })
        .catch((error) => {
        console.error(error);
        });
}



useEffect(() => {
    fetch(`${entrypoint}/api/applies/${id}`,{
    methode : 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => setAppliant(data.response));
    
}, id)
// console.log(mission);
// console.log(user);
// console.log(author);
//console.log(appliants);
return (
<div className={classes.root}>
<CssBaseline />
<Grid container component="main" className={classes.main}>
    
    <Container maxWidth="md">
    
        <Card className={classNames(classes.main, classes.margint3)}>
            <CardHeader className={classNames(classes.bgred, classes.center)}
                title= {mission.title}
            />
            <CardContent>
                <Grid container maxWidth="sm" className={classNames(classes.margin)}>
                    <Grid item xs={false} sm={1} md={1} direction="row" justify="start" alignItems="center">
                            <Avatar src="/broken-image.jpg"/>
                    </Grid>
                    <Grid container item xs={11} sm={11} md={11} direction="row" justify="start" alignItems="center">
                        <Typography variant="body1">
                            Responsable : {mission.author != null && mission.author.firstname + ' ' + mission.author.lastname}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container maxWidth="sm" className={classNames(classes.margin, classes.margint2)}>
                    <Grid item xs={6} sm={6} md={6} direction="row" justify="center" alignItems="center">
                        <Typography variant="body1">
                            Crée le : {mission.created_at != null && mission.created_at.substr(0, 10)}
                        </Typography>  
                    </Grid>
                    <Grid container item xs={6} sm={6} md={6} direction="row" justify="start" alignItems="start">
                        <Typography variant="body1">
                            Durée : {calculateDateDuration(mission.start_date, mission.end_date)} jour(s) 
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container maxWidth="sm" className={classNames(classes.margin)}>
                    <Grid item xs={6} sm={6} md={6} direction="row" justify="center" alignItems="center">
                        <Typography variant="body1">
                            Adresse : {mission.address_hospital}
                        </Typography>
                    </Grid>
                    <Grid container item xs={6} sm={6} md={6} direction="row" justify="start" alignItems="start">
                        <Typography variant="body1">
                            Nombre de bénévoles souhaité(s) : {mission.nb_people_required}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container maxWidth="sm" className={classNames(classes.margin)}>
                    <Grid item xs={6} sm={6} md={6} direction="row" justify="center" alignItems="center">  
                        <Typography variant="body1">
                            Mission de : {lowerCase(mission.night_or_day)}
                        </Typography>  
                    </Grid>
                    <Grid container item xs={6} sm={6} md={6} direction="row" justify="start" alignItems="start">
                        <Typography variant="body1">
                            Compétence requise ? : {mission.skills_required}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container maxWidth="sm" className={classNames(classes.margin)}>
                    <Grid item xs={12} sm={12} md={12} direction="row" justify="center" alignItems="center" className={classNames(classes.margin, classes.margint3)}>
                        <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <strong>Description de la mission</strong>
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container maxWidth="sm" className={classNames(classes.margin)}>
                    <Grid item xs={12} sm={12} md={12} direction="row" justify="center" alignItems="center" className={classes.justify}>
                        <Typography variant="body1">
                            {mission.description}
                        </Typography>  
                    </Grid>
                </Grid>
                
            </CardContent>
            <CardActions className={classNames(classes.margin, classes.padding, classes.center)}>

                    {user && appliants &&  renderPostulerButton() }

            </CardActions>
        </Card>

       {user && mission && user.id==mission.author.id &&  <AdminApplyant/>}

       
        <CommentaireMission/>
    
    </Container>

</Grid>
    
</div>
);
}