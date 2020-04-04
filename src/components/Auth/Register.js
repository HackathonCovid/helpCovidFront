import 'date-fns';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import history from '../../history';
import {entrypoint} from "../../entrypoint";
import MuiAlert from '@material-ui/lab/Alert';

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
const orga = [
    {
        value: 'Hopital',
        label: 'Hopital',
    },
    {
        value: 'Clinique',
        label: 'Clinique',
    },
    {
        value: 'Ehpad',
        label: 'Ehpad',
    },
];

export default function SignUp() {
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone_number, setPhoneNumber] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [orga_name, setOrganame] = React.useState('');
    const [type_orga, setTypeOrga] = React.useState('');
    let   [is_volunteer, setIsvolunter] = React.useState('');
    const [registered, setRegistered] = React.useState(false);
    const [error, setError] = React.useState(false);
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };
    let { benevole } = useParams();

    if (benevole === "benevole"){
        is_volunteer = 1;
    }
    else if (benevole === "soignant"){
        is_volunteer = 0;
    }
    else{
        is_volunteer = null;
    }

    function register(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`${entrypoint}/api/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastname,
                firstname,
                orga_name,
                email,
                city,
                phone_number,
                adress,
                description,
                type_orga,
                password,
                is_volunteer
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.hasOwnProperty('error')) {
                    setError(true);
                }
                else if(data.response.hasOwnProperty('id')) {
                    setRegistered(true);
                    setError(false);
                    history.push('/login');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            { error && <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Erreur
                </Alert>
            </Snackbar> }
            { registered && <h2>Compte créé</h2> }

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    S'inscrire
                </Typography>

                <form className={classes.form} onSubmit={register}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firstname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="First name"
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
                        {benevole == "soignant" && (
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="type orga"
                                select
                                label="Type d'organisation"
                                value={type_orga}
                                onChange={e => setTypeOrga(e.target.value)}
                                helperText="Merci de choisir le type d'organisation"
                                variant="outlined"
                            >
                                {orga.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        )}
                        {benevole == "soignant" && (
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nomorga"
                                label="Nom d'organisation"
                                name="nomorga"
                                autoComplete="nomorga"
                                value={orga_name}
                                onChange={e => setOrganame(e.target.value)}
                            />
                        </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="adresse"
                                label="Adresse"
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
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="descritpion"
                                label="Description"
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
                                label="Téléphone"
                                name="téléphone"
                                autoComplete="phone_number"
                                value={phone_number}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Mot de passe"
                                name="password"
                                type="password"
                                autoComplete="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                        S'enregistrer
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Se connecter ?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}