/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Copyright } from "src/components/copyright";
import { Dialog, FormHelperText } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageHeaders from "src/components/headers";
import { Link as RouterLink } from "react-router-dom";
import UniversityData from "src/data/UniversityData.json";
import DegreeData from "src/data/DegreeData.json";
import GenderData from "src/data/GenderData.json";
import EthnicityData from "src/data/EthnicityData.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*£"'])(?=.{8,})/,
      "Must contain 8 characters (one uppercase, one lowercase, one number and one special character)"
    ),
  legal: Yup.boolean()
    .required("Please accept the terms & conditions")
    .oneOf([true], "Please accept the terms & conditions"),
  whyThisHackathon: Yup.string().required("Required"),
  priorExperience: Yup.string().required("Required"),
  firstHack: Yup.string().required("Required"),
});

const InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  ethnicity: "",
  gender: "",
  university: "",
  degree: "",
  whyThisHackathon: "",
  priorExperience: "",
  firstHack: "",
  legal: false,
};

export default function Apply() {
  const classes = useStyles();
  const app = getApp();
  const db = getFirestore(app);

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");

  const handleFormSubmit = async (values: any) => {
    const auth = getAuth();
    values.email = values.email.toLowerCase();
    values["date"] = Date.now();
    const currPassword = values.password;
    delete values["password"];
    delete values["legal"];
    await createUserWithEmailAndPassword(
      auth,
      values.email,
      currPassword
    ).catch((error) => {
      let message = "";
      if (error.code === "auth/email-already-in-use") {
        message = "This email has already been used! Please log in.";
      } else {
        message = error.code;
      }
      setErrorMessageText(message);
      setErrorMessageOpen(true);
    });
    await addDoc(collection(db, "users"), values);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: `${values.firstName} ${values.lastName}`,
      });
    }
    setMessageText(
      "Thank you for applying! We will reach out to you if your application is accepted, so stay tuned!"
    );
    setMessageOpen(true);
  };

  return (
    <>
      <PageHeaders title={"Apply"} />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Apply
                </Typography>
                <Box m={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email Address"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label={`Why do you want to participate in ${process.env.REACT_APP_HACKATHON_NAME_SHORT}?`}
                        id="whyThisHackathon"
                        name="whyThisHackathon"
                        value={values.whyThisHackathon}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={6}
                        required
                        error={
                          touched.whyThisHackathon &&
                          Boolean(errors.whyThisHackathon)
                        }
                        helperText={
                          touched.whyThisHackathon && errors.whyThisHackathon
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Do you have any prior experience in programming?"
                        id="priorExperience"
                        name="priorExperience"
                        value={values.priorExperience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={6}
                        required
                        error={
                          touched.priorExperience &&
                          Boolean(errors.priorExperience)
                        }
                        helperText={
                          touched.priorExperience && errors.priorExperience
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Is this your first hackathon? If not, what is are the names of the hackathons and what did you build?"
                        id="firstHack"
                        name="firstHack"
                        value={values.firstHack}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={6}
                        required
                        error={touched.firstHack && Boolean(errors.firstHack)}
                        helperText={touched.firstHack && errors.firstHack}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Ethnicity (Optional)"
                        id="ethnicity"
                        name="ethnicity"
                        value={values.ethnicity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        select
                      >
                        {EthnicityData.map((name, key) => (
                          <MenuItem key={key} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Gender (Optional)"
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        select
                      >
                        {GenderData.map((name, key) => (
                          <MenuItem key={key} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="University (Optional)"
                        id="university"
                        name="university"
                        value={values.university}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        select
                      >
                        {UniversityData.map((name, key) => (
                          <MenuItem key={key} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Degree (Optional)"
                        id="degree"
                        name="degree"
                        value={values.degree}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        select
                      >
                        {DegreeData.map((name, key) => (
                          <MenuItem key={key} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel
                        style={{ paddingTop: "6px", paddingBottom: "2px" }}
                      >
                        CV Upload (Optional)
                      </InputLabel>
                      <Box mt={1} mb={2}>
                        <Typography variant="caption">
                          Upload your CV for our sponsors to potentially reach
                          out to you!
                        </Typography>
                      </Box>
                      <input
                        type="file"
                        accept="application/pdf"
                        id="resume"
                        name="resume"
                        onChange={(e) => {
                          if (e.target.type === "file" && e.target.files) {
                            const date = new Date();
                            uploadBytes(
                              ref(
                                getStorage(),
                                "CVs/" +
                                  `${values.firstName}${
                                    values.lastName
                                  } - ${date.getDate()}${date.getMonth()} ${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                              ),
                              e.target.files[0]
                            );
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box alignItems="center" display="flex" ml={-1}>
                        <Checkbox
                          color="primary"
                          name="legal"
                          id="legal"
                          checked={values.legal}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Typography color="textSecondary" variant="body1">
                          I accept the{" "}
                          <Link
                            color="primary"
                            component={RouterLink}
                            to="/legal"
                          >
                            terms and conditions
                          </Link>
                        </Typography>
                      </Box>
                      {touched.legal && Boolean(errors.legal) && (
                        <FormHelperText error>{errors.legal}</FormHelperText>
                      )}
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
                      <Button component={RouterLink} to="/login">
                        <Typography
                          variant="caption"
                          style={{ fontSize: "0.8em" }}
                        >
                          Already have an account? Log in
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
        <Box p={5}>
          <Copyright variant="body2" color="textSecondary" />
        </Box>
      </Container>
      <Dialog
        open={messageOpen}
        onClose={() => {
          window.location.href = "/";
        }}
      >
        <Box m={3}>
          <Typography>{messageText}</Typography>
        </Box>
      </Dialog>
      <Dialog
        open={errorMessageOpen}
        onClose={() => {
          setErrorMessageOpen(false);
        }}
      >
        <Box m={3}>
          <Typography>{errorMessageText}</Typography>
        </Box>
      </Dialog>
    </>
  );
}
