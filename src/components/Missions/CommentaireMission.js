import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { useParams } from "react-router-dom";
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import {entrypoint} from "../../entrypoint";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [comments, setComments] = React.useState('');
    const [body, setbody] = React.useState('');
    const  user_id = 0
    let { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [success, setSuccess] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const onchangevalue = event => {
        setbody(event.target.value)
    };
    const addComment = event => {
       
        fetch(`${entrypoint}/api/comments/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ user.token,
            },
            body: JSON.stringify({
                user_id,
                body
            }),
        })
            .then((response) => response.json())
            .then((data) => {
               setComments([...comments, data.response])               
            })
            .catch((error) => {
                console.error(error);
            });
    };

    

    useEffect(() => {
        fetch(`${entrypoint}/api/comments/${id}`,{
        methode : 'GET'
        })
        .then((resp) => resp.json())
        .then((data) => setComments(data.response));
        
    }, id)

    function deleteCom(idc) {
        fetch(`${entrypoint}/api/comments/${idc}` , {
        method: 'DELETE',
        headers: {
            'authorization': 'Bearer '+ user.token,
        },
        })
        .then((resp) => resp.json())
        .then((data) => {
        if(data) {
            setSuccess(true);
        }
        })
    }

    return (
    <div className={classes.root}>
        <React.Fragment>
    <CssBaseline />
    { success &&
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Commentaire supprimé !
                </Alert>
            </Snackbar>
        }
        <Card className={classNames(classes.commentaire, classes.margint2)}>
        <CardActions className={classNames(classes.margin, classes.padding, classes.center)}>
            <TextField
            required
            fullWidth
            id="outlined-multiline-static"
            label="Commentaire"
            multiline
            rows="4"
            defaultValue=""
            variant="outlined"
            onChange={onchangevalue}
            />
        </CardActions>

            <CardActions className={classNames(classes.margin, classes.padding, classes.center)}>
            <Button variant="contained" size="small" color="grey" className={classNames(classes.margin, classes.padding)}
            onClick={addComment}>
            Commenter
            </Button>
            </CardActions>
        </Card>
        {comments && comments.map((comment) => (
            <Card className={classNames(classes.commentaire, classes.margint2)}>
                <CardContent>
                    <Typography variant="h5" gutterBottom >
                    Commentaire
                    </Typography>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar src="/broken-image.jpg" />
                            }
                            action={
                            <IconButton aria-label="settings" onClick={handleMenu}>
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={user.firstname}
                            subheader={user.lastname}
                        />
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {deleteCom(comment.id)}}>Supprimer</MenuItem>
                        </Menu>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/paella.jpg"
                            title="picto"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {comment.body}
                            </Typography>
                        </CardContent>
                       {/* <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                           <!-- <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </IconButton>-->
                        </CardActions>
                        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                            </CardContent>
                        </Collapse>
                    */} </Card> 
                </CardContent>
                
            </Card>
        ))}
</React.Fragment>
    </div>
    );
}