import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';

import classNames from 'classnames';
import { useParams } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


import {entrypoint} from "../../entrypoint";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
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
    item: {
        '&:hover': {
            background: "#ECE8E7",
            },
    },
    buttonres: {
        [theme.breakpoints.down('sm')]: {
            
          },
          [theme.breakpoints.up('md')]: {
            
          },
    }
    }));

export default function About() {
        
    const classes = useStyles();
    const [appliants, setAppliant] = React.useState('');
    let { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch(`${entrypoint}/api/applies/${id}`,{
        methode : 'GET'
        })
        .then((resp) => resp.json())
        .then((data) => setAppliant(data.response));
        
    }, id)


    const AccepteUser = (element, appliant, validate) => {
        
    //element.target.style.backgroundColor = "green";
    if(validate ==1){
        element.target.style.color = "#3f51b5";
        document.getElementById("del_"+appliant.id).style.color="#0000008a";
    }else{
        document.getElementById("val_"+appliant.id).style.color= '#0000008a';
        element.target.style.color = "#f50057";
    }
        let id = appliant.id;
        let user_id = appliant.user_id;
        let mission_id = appliant.mission_id;
        //element.color = 'inherit';
        fetch(`${entrypoint}/api/validate/${id}` , {
        method: 'POST',
        body: JSON.stringify({
            id,
            user_id,
            mission_id,
            validate,
        }),
        })
        .then((resp) => resp.json())
        .then((data) => {
          //  console.log(data)
        })
    }
    //console.log(appliants)

    return (
    <div className={classes.root}>
        <React.Fragment>
        <CssBaseline />

        <Card className={classNames(classes.main, classes.margint2)}>
            <CardHeader className={classNames(classes.bgred, classes.center)}
                title= "Les candidats à la mission"
            />
            <CardContent>
            <List>
                {appliants && appliants.map((appliant) => (
                    
                <ListItem className={classNames(classes.item)}>
                    <Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <ListItemAvatar>
                            <AccountBoxIcon/>
                        </ListItemAvatar>
                    </Grid>
                    <Grid item xs={6} sm={6} md={8}>
                    <ListItemText 
                    primary={"Nom : " +appliant.user.firstname + ', Prénom : ' + appliant.user.lastname + ', Numéro de tel : ' +appliant.user.phone_number} 
                    />
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                    {appliant.validate ===0 && 
                            <ListItemSecondaryAction className={classNames(classes.buttonres)}>
                                <IconButton id={"val_"+appliant.id} onClick={(element) => {AccepteUser(element, appliant,1)}} aria-label="delete">
                                    <CheckCircleIcon />
                                </IconButton>
                                <IconButton id={"del_"+appliant.id} onClick={(element) => {AccepteUser(element,appliant,2)}} aria-label="delete">
                                    <CancelIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        }
                        {appliant.validate ===1 &&
                            <ListItemSecondaryAction className={classNames(classes.buttonres)}>
                                <IconButton id={"val_"+appliant.id} color="primary" onClick={(element) => {AccepteUser(element, appliant,1)}} aria-label="delete">
                                    <CheckCircleIcon />
                                </IconButton>
                                <IconButton id={"del_"+appliant.id} onClick={(element) => {AccepteUser(element,appliant,2)}} aria-label="delete">
                                    <CancelIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        }
                        {appliant.validate ===2 &&
                            <ListItemSecondaryAction className={classNames(classes.buttonres)}>
                                <IconButton id={"val_"+appliant.id}  onClick={(element) => {AccepteUser(element, appliant,1)}} aria-label="delete">
                                    <CheckCircleIcon />
                                </IconButton>
                                <IconButton id={"del_"+appliant.id} color="secondary" onClick={(element) => {AccepteUser(element,appliant,2)}} aria-label="delete">
                                    <CancelIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        }
                    </Grid>
                    
                    </Grid>
                </ListItem>
                ))}     
            </List>
            </CardContent>
            
        </Card>

        </React.Fragment>
    </div>
    );
}