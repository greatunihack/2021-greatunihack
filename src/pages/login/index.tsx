import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "src/components/auth/AuthContext";
import { useHistory } from "react-router-dom";
import { Copyright } from "src/components/copyright";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageHeaders from "src/components/headers";

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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const { setUser } = useContext(AuthContext);
  const [resetPassword, setResetPassword] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const history = useHistory();

  return (
    <>
      <PageHeaders title={"Login"} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box m={2}>
            <Formik
              onSubmit={(values) => {
                const auth = getAuth();
                const inputEmail = values.email.toLowerCase();
                signInWithEmailAndPassword(auth, inputEmail, values.password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    history.push("/dashboard/home");
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                  });
              }}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email required"),
                password: Yup.string().required("Password required"),
              })}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    value={values.email}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    value={values.password}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  {/* <Grid container justifyContent="flex-end">
                  <Grid item xs>
                    <Button
                      onClick={() => {
                        setResetPassword(true);
                      }}
                    >
                      <Typography
                        variant="caption"
                        style={{ fontSize: "0.8em" }}
                      >
                        Forgot password?
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to="/apply">
                      <Typography
                        variant="caption"
                        style={{ fontSize: "0.8em" }}
                      >
                        {"Don't have an account? Apply"}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid> */}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        <Box p={5}>
          <Copyright variant="body2" color="textSecondary" />
        </Box>
        <Dialog
          open={resetPassword}
          onClose={() => {
            setResetPassword(false);
          }}
          fullWidth
        >
          <Formik
            onSubmit={(values) => {
              const auth = getAuth();
              const inputEmail = values.email.toLowerCase();

              sendPasswordResetEmail(auth, inputEmail)
                .then(() => {
                  setResetPassword(false);

                  setMessageText("Reset email sent!");
                  setMessageOpen(true);
                })
                .catch(() => {
                  setResetPassword(false);
                  setMessageText("Error. Please enter a valid email address.");
                  setMessageOpen(true);
                });
            }}
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email")
                .required("Email required"),
            })}
          >
            {({ errors, handleBlur, handleChange, values, touched }) => (
              <Form>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setResetPassword(false);
                    }}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Reset
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
        <Dialog
          open={messageOpen}
          onClose={() => {
            window.location.reload();
          }}
        >
          <Box m={3}>
            <Typography>{messageText}</Typography>
          </Box>
        </Dialog>
      </Container>
    </>
  );
}
