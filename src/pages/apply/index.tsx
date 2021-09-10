import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Copyright } from "src/components/copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Apply() {
  const classes = useStyles();
  const app = getApp();
  const db = getFirestore(app);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    discord: "",
    gender: "",
    ethnicity: "",
    GDPRaccept: false,
  });

  // eslint-disable-next-line
  function handleChange(e: any) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [discordError, setDiscordError] = useState(false);

  const [GDPRError, setGDPRError] = useState(false);

  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setfirstNameError(false);
    setlastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setGDPRError(false);

    if (state.firstName === "") {
      setfirstNameError(true);
    }
    if (state.lastName === "") {
      setlastNameError(true);
    }
    if (state.email === "") {
      setEmailError(true);
    }

    if (state.password === "") {
      setPasswordError(true);
    }
    if (state.discord === "") {
      setDiscordError(true);
    }

    if (state.GDPRaccept === false) {
      setGDPRError(true);
      alert("The check box must be checked");
    }

    if (
      state.firstName &&
      state.lastName &&
      state.email &&
      state.password &&
      state.discord &&
      state.GDPRaccept
    ) {
      createUser(
        state.firstName,
        state.lastName,
        state.email,
        state.password,
        state.discord,
        state.ethnicity,
        state.gender
      );
    }
  };

  function createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    discord: string,
    ethnicity: string,
    gender: string
  ) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // eslint-disable-next-line
        const user = userCredential.user;

        try {
          const docRef = addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            discord: discord,
            ethnicity: ethnicity,
            gender: gender,
          });
          console.log("Document written", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Apply
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={state.firstName}
                autoFocus
                onChange={handleChange}
                error={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={state.lastName}
                onChange={handleChange}
                error={lastNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={handleChange}
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={handleChange}
                error={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="discord"
                label="Discord"
                type="Discord"
                id="Discord"
                autoComplete="Discord-username"
                value={state.discord}
                onChange={handleChange}
                error={discordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="ethnicity"
                label="Ethnicity"
                type="ethnicity"
                id="ethnicity"
                autoComplete="ethnicity"
                value={state.ethnicity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                id="demo-simple-select-label"
                className={classes.formControl}
              >
                Gender
              </InputLabel>
              <Select
                variant="outlined"
                fullWidth
                name="gender"
                label="gender"
                type="gender"
                id="gender"
                autoComplete="Gender"
                value={state.gender}
                onChange={handleChange}
              >
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormControl required error={GDPRError}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="GDPRaccept"
                      checked={state.GDPRaccept}
                      onChange={handleChange}
                    />
                  }
                  label="I agree for my data to be stored when necessary."
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Apply
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box p={5}>
        <Copyright variant="body2" color="textSecondary" />
      </Box>
    </Container>
  );
}
