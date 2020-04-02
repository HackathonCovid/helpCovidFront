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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
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
const sexes = [
    {
        value: 'Homme',
        label: 'H',
    },
    {
        value: 'Femme',
        label: 'F',
    },
];

export default function UserProfil() {
    const data = JSON.parse(localStorage.getItem('user'));
    const token = data.token;
    const [firstname, setFirstname] = React.useState(data.firstname);
    const [lastname, setLastname] = React.useState(data.lastname);
    const [email, setEmail] = React.useState(data.email);
    const [city, setCity] = React.useState(data.city);
    const [phone_number, setPhoneNumber] = React.useState(data.phone_number);
    const [description, setDescription] = React.useState(data.description);
    const [adress, setAdress] = React.useState(data.adress);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateSuccess(false);
    };

    function updateUser(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/api/users/${data.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                lastname,
                firstname,
                email,
                city,
                phone_number,
                adress,
                description,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200) {
                    setUpdateSuccess(true);
                    data.response.token = token;
                    localStorage.setItem('user', JSON.stringify(data.response));
                    history.push('/profil');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountBox />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Profil utilisateur
                </Typography>

                <form className={classes.form} onSubmit={updateUser}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firstname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Prénom"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Nom"
                                name="lastName"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                autoComplete="lastname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="adresse"
                                label="adresse"
                                name="adresse"
                                autoComplete="adresse"
                                value={adress}
                                onChange={e => setAdress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="Ville"
                                name="city"
                                autoComplete="Ville"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
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
                                id="descritpion"
                                label="description"
                                name="description"
                                autoComplete="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="téléphone"
                                label="téléphone"
                                name="téléphone"
                                autoComplete="phone_number"
                                value={phone_number}
                                onChange={e => setPhoneNumber(e.target.value)}
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
                        Modifier
                    </Button>
                </form>
                <Snackbar open={updateSuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Profil mis à jour !
                    </Alert>
                </Snackbar>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}