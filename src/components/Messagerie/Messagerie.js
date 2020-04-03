import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '91vh',
    },
    canvas: {
        height: '91vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    center: {
        textAlign: 'center',
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
    list:{
        backgroundColor : '#FFFFFF',
        overflowY : 'scroll',
        height: '91vh',
    },
    inline:{
        display : 'inline',
    },
    messageTeaser:{
        borderColor : '1px solid black',
        borderLeft: '10px solid #009FFF',
        backgroundColor : '#FCFAFF',
        marginBottom : '1px',
        '&:hover': {
            background: "#ECE8E7",
         },
    },
    messageTeaserSelected:{
        backgroundColor : '#EDEDED',
    },
    }));

export default function Messagerie() {
const classes = useStyles();
    
return (
<div className={classes.root}>
<CssBaseline />
<Grid container direction="row" justify="center" alignItems="start" className={classNames(classes.canvas)}>
    <Grid item xs={4} className={classNames(classes.list)}>
        
        
        <Grid item md={12}  className={classNames(classes.inline)}>
        <Card className={classes.messageTeaser}>
            <CardContent>
                <Typography variant="h5" component="h2">
                Jean Michel
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                TU ME MONTRES TA PHOTO ?
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item md={12} className={classNames(classes.inline)}>
        <Card className={classes.messageTeaser}>
            <CardContent>
                <Typography variant="h5" component="h2">
                Jean Michel
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                TU ME MONTRES TA PHOTO ?
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item md={12} className={classNames(classes.inline)}>
        <Card className={classes.messageTeaser}>
            <CardContent>
                <Typography variant="h5" component="h2">
                Jean Michel
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                TU ME MONTRES TA PHOTO ?
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        
        
        
        
        
    </Grid>
    <Grid container item xs={8} direction="row" justify="flex-end" alignItems="flex-end" className={classNames(classes.black)}>
        <Typography variant="body1">
            blblbl
        </Typography>
    </Grid>
</Grid>

</div>
);
}