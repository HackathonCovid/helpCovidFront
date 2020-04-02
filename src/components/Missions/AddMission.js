import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import ImageUploader from "react-images-upload";


import history from '../../history';
import {entrypoint} from "../../entrypoint";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function AddMission(props) {
const classes = useStyles();
const id = React.useState(JSON.parse(localStorage.getItem('user')).id);
const author_id = id[0];
const [title, setTitle] = React.useState('');
const [description, setDesciption] = React.useState('');
const [nb_people_requiredS, setNbPeopleRequired] = React.useState('');
const nb_people_required = Number(nb_people_requiredS);
const [night_or_day, setNightOrDay] = React.useState('');
const [skills_required, setSkillsRequired] = React.useState('');
const [address_hospital, setAddressHospital] = React.useState('');
const [start_date, setStartDate] = React.useState(new Date().now);
const [end_date, setEndDate] = React.useState(new Date().now);
const handleDateChange = (date) => {setStartDate(date);};
const handleDateChangeEnd = (date) => {setEndDate(date);};
const handleChangeDN = (event) => {setNightOrDay(event.target.value);};
const [success, setSuccess] = React.useState(false);
const [pictures, setPictures] = useState([]);
const onDrop = picture => {
    setPictures([...pictures, picture]);
};

const user = JSON.parse(localStorage.getItem("user"));

function addMission(e) {
    e.preventDefault();
    e.stopPropagation();
    

    fetch(`${entrypoint}/api/missions`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+ user.token,
    },
    body: JSON.stringify({
        author_id,
        title,
        description,
        start_date,
        end_date,
        nb_people_required,
        night_or_day,
        skills_required,
        address_hospital,

    }),
    })
    .then((response) => response.json())
    .then((data) => {
    if(data.response.hasOwnProperty('author_id')) {
        setSuccess(true);
        history.push('/missions');
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
    <Typography component="h1" variant="h5">
        Créer une mission
    </Typography>
        <form className={classes.form} onSubmit={addMission}>

    { success && <Alert severity="success">Mission ajoutée avec succès</Alert> }

    <br/>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <TextField
        required
        fullWidth
        id="outlined-required"
        label="Title"
        defaultValue="Mission d'aide"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={title}
        onChange={e => setTitle(e.target.value)}
    />
    </Grid>

    <Grid item xs={12}>
    <TextField
    required
    fullWidth
    id="outlined-multiline-static"
    label="Description"
    multiline
    rows="4"
    defaultValue="Description"
    variant="outlined"
    value={description}
    onChange={e => setDesciption(e.target.value)}
    />
    </Grid>

    <Grid item xs={12}>
    <TextField
        required
        fullWidth
        id="outlined-required"
        label="adresse de l'hopital"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={address_hospital}
        onChange={e => setAddressHospital(e.target.value)}
    />
    </Grid>

    <Grid item xs={12}>
    <TextField
        required
        fullWidth
        id="outlined-number"
        label="Nombre de personnes"
        type="number"
        InputLabelProps={{
            shrink: true,
        }}
        variant="outlined"
        value={nb_people_requiredS}
        onChange={e => setNbPeopleRequired(e.target.value)}
        />
    </Grid>

    <Grid item xs={12}>
    <TextField
    required
    fullWidth
    id="outlined-multiline-static"
    label="Les compétences nécessaires"
    multiline
    rows="2"
    defaultValue="Les compétences nécessaires"
    variant="outlined"
    value={skills_required}
    onChange={e => setSkillsRequired(e.target.value)}
    />
    </Grid>

    <Grid item xs={12} sm={6}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="date"
        label="date de début"
        format="MM/dd/yyyy"
        value={start_date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
            'aria-label': 'changer la date',
        }}
        />
    </MuiPickersUtilsProvider>
    </Grid>

    <Grid item xs={12} sm={6}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="date"
        label="date de fin de mission"
        format="MM/dd/yyyy"
        value={end_date}
        onChange={handleDateChangeEnd}
        KeyboardButtonProps={{
            'aria-label': 'changer la date',
        }}
        />
    </MuiPickersUtilsProvider>
    </Grid>

    <Grid item xs={12}>
    <RadioGroup aria-label="Jour ou nuit" name="jourounuit" value={night_or_day} onChange={handleChangeDN}>
            <FormControlLabel value="Jour" control={<Radio />} label="Jour" />
            <FormControlLabel value="Nuit" control={<Radio />} label="Nuit" />
            <FormControlLabel value="Jour et nuit" control={<Radio />} label="Les deux" />
    </RadioGroup>
    </Grid>

    <Grid item xs={12}>
    <ImageUploader
        {...props}
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        />
    </Grid>

    </Grid>

    

    <Button variant="outlined" color="primary" className={classes.submit} type="submit">
        Publier la mission
    </Button>
    </form>
    </div>
    </Container>
);
}