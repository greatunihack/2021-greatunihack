/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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

export default function Apply() {
  const classes = useStyles();
  const app = getApp();
  const db = getFirestore(app);

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");

  return (
    <>
      <PageHeaders title={"Apply"} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          onSubmit={async (values) => {
            const auth = getAuth();
            const inputEmail = values.email.toLowerCase();
            await createUserWithEmailAndPassword(
              auth,
              inputEmail,
              values.password
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
            await addDoc(collection(db, "users"), {
              firstName: values.firstName,
              lastName: values.lastName,
              email: inputEmail,
              ethnicity: values.ethnicity,
              gender: values.gender,
            });
            if (auth.currentUser) {
              updateProfile(auth.currentUser, {
                displayName: `${values.firstName} ${values.lastName}`,
              });
            }
            setMessageText(
              "Thank you for applying! You should now create a Devpost account and link your Discord account."
            );
            setMessageOpen(true);
          }}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            ethnicity: "",
            gender: "",
            resume: null,
            GDPR: false,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First name required"),
            lastName: Yup.string().required("Last name required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email required"),
            password: Yup.string()
              .required("Password required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*£"'])(?=.{8,})/,
                "Must contain 8 characters (one uppercase, one lowercase, one number and one special character)"
              ),
            GDPR: Yup.boolean()
              .required("Please accept the terms & conditions")
              .oneOf([true], "Please accept the terms & conditions"),
          })}
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
                        label="Ethnicity (Optional)"
                        id="ethnicity"
                        name="ethnicity"
                        value={values.ethnicity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        select
                      >
                        <MenuItem value={"Indian"}>Indian</MenuItem>
                        <MenuItem value={"Pakistani"}>Pakistani</MenuItem>
                        <MenuItem value={"Bangladeshi"}>Bangladeshi</MenuItem>
                        <MenuItem value={"Chinese"}>Chinese</MenuItem>
                        <MenuItem divider={true} value={"Asian - Other"}>
                          Asian - Other
                        </MenuItem>
                        <MenuItem value={"Black African"}>
                          Black African
                        </MenuItem>
                        <MenuItem value={"Black Caribbean"}>
                          Black Caribbean
                        </MenuItem>
                        <MenuItem divider={true} value={"Black - Other"}>
                          Black - Other
                        </MenuItem>
                        <MenuItem value={"Mixed White/Asian"}>
                          Mixed White/Asian
                        </MenuItem>
                        <MenuItem value={"Mixed White/Black African	"}>
                          Mixed White/Black African
                        </MenuItem>
                        <MenuItem value={"Mixed White/Black Caribbean"}>
                          Mixed White/Black Caribbean
                        </MenuItem>
                        <MenuItem divider={true} value={"Mixed - Other"}>
                          Mixed - Other
                        </MenuItem>
                        <MenuItem value={"White British"}>
                          White British
                        </MenuItem>
                        <MenuItem value={"White Irish	"}>White Irish </MenuItem>
                        <MenuItem value={"White Gypsy/Traveller"}>
                          White Gypsy/Traveller
                        </MenuItem>
                        <MenuItem divider={true} value={"White - Other"}>
                          White - Other
                        </MenuItem>
                        <MenuItem value={"Arab"}>Arab</MenuItem>
                        <MenuItem value={"Other"}>Other </MenuItem>
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
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
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
                          name="GDPR"
                          id="GDPR"
                          checked={values.GDPR}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Typography color="textSecondary" variant="body1">
                          I agree to the{" "}
                          <Link
                            color="primary"
                            component={RouterLink}
                            to="/legal"
                          >
                            terms and conditions
                          </Link>
                        </Typography>
                      </Box>
                      {touched.GDPR && Boolean(errors.GDPR) && (
                        <FormHelperText error>{errors.GDPR}</FormHelperText>
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
          window.location.href = "/dashboard/home";
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
