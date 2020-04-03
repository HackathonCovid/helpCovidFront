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
    }
    }));

export default function About() {
        
    const classes = useStyles();
    const [appliants, setAppliant] = React.useState('');
    let { id } = useParams();

    useEffect(() => {
        fetch(`${entrypoint}/api/applies/${id}`,{
        methode : 'GET'
        })
        .then((resp) => resp.json())
        .then((data) => setAppliant(data.response));
        
    }, id)

    console.log(appliants)

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
                    <ListItemAvatar>
                        <AccountBoxIcon/>
                    </ListItemAvatar>
                    <ListItemText
                    primary={appliant.mission.author.firstname + '' + appliant.mission.author.lastname}
                    />
                    <ListItemSecondaryAction>
                    <IconButton aria-label="delete">
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <CancelIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <CommentIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                ))}

            </List>
            </CardContent>
            
        </Card>

        </React.Fragment>
    </div>
    );
}