import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBox from '@material-ui/icons/AccountBox';
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

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    canvas: {
        minHeight : '91vh',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ChangerMdp() {
    const data = JSON.parse(localStorage.getItem('user'));
    const token = data.token;
    const [email, setEmail] = React.useState(data.email);
    const [retype_password, setRetypePassword] = React.useState('');
    const [new_password, setNewPassword] = React.useState('');
    const [current_password, setCurrentPassword]= React.useState('');
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateSuccess(false);
    };

    function updateMdp(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/api/password/userreset`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                email,
                current_password,
                new_password,
                retype_password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200) {
                    setUpdateSuccess(true);
                    localStorage.removeItem('user');
                    history.push('/login');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Container className={classes.canvas} component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountBox />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Changer mon mot de passe
                </Typography>

                <form className={classes.form} onSubmit={updateMdp}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="current_password"
                                label="Mot de passe actuel"
                                name="current_password"
                                autoComplete="current_password"
                                type="password"
                                value={current_password}
                                onChange={e => setCurrentPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="new_password"
                                label="Nouveau mot de passe"
                                name="new_password"
                                autoComplete="new_password"
                                type="password"
                                value={new_password}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="new_password"
                                label="Vérification du nouveau mot de passe"
                                name="new_password"
                                autoComplete="new_password"
                                type="password"
                                value={retype_password}
                                onChange={e => setRetypePassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Modifier mon mot de passe
                    </Button>
                </form>
                <Snackbar open={updateSuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Mot de passé modifié avec succès !
                    </Alert>
                </Snackbar>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}