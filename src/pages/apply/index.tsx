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
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiAu-TMx91OZd3yRuwThXJN0srD2dbaQ4",
  authDomain: "greatunihack21.firebaseapp.com",
  projectId: "greatunihack21",
  storageBucket: "greatunihack21.appspot.com",
  messagingSenderId: "393678004919",
  appId: "1:393678004919:web:8bbb46c9751adc9e90e332",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        GreatUniHacks2021
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discord, setDiscord] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [discordError, setDiscordError] = useState(false);

  const [GDPRaccept, setGDPR] = useState(false);
  const [GDPRError, setGDPRError] = useState(false);

  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setfirstNameError(false);
    setlastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setGDPRError(false);

    if (firstName === "") {
      setfirstNameError(true);
    }
    if (lastName === "") {
      setlastNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }
    if (discord === "") {
      setDiscordError(true);
    }

    if (GDPRaccept === false) {
      setGDPRError(true);
      alert("The check box must be checked");
    }

    if (firstName && lastName && email && password && discord && GDPRaccept) {
      createUser(
        firstName,
        lastName,
        email,
        password,
        discord,
        ethnicity,
        gender
      );
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                autoFocus
                onChange={(e) => setfirstName(e.target.value)}
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
                onChange={(e) => setlastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Discord"
                label="Discord"
                type="Discord"
                id="Discord"
                autoComplete="Discord-username"
                onChange={(e) => setDiscord(e.target.value)}
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
                onChange={(e) => setEthnicity(e.target.value)}
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
                onChange={(e) => setGender(e.target.value as string)}
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
                      value="GDPR"
                      color="primary"
                      onChange={(e) => setGDPR(e.target.checked)}
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
            Sign Up
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

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
        // Signed in
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
}
