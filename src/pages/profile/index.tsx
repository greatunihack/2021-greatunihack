import {
  Box,
  Container,
  Grid,
  MenuItem,
  makeStyles,
  TextField,
  CssBaseline,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

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
    minWidth: 120,
  },
}));

// TODO: Add validation schema
const validationSchema = yup.object({});

export default function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    discord: "",
    gender: "",
    ethnicity: "",
    GDPRaccept: false,
  });

  // TODO: Fetch data from Firebase
  useEffect(() => {
    setProfile({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      discord: "",
      gender: "",
      ethnicity: "",
      GDPRaccept: false,
    });
  }, []);

  const formik = useFormik({
    initialValues: profile,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                id="email"
                label="Email Address"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="discord"
                id="discord"
                label="Discord Tag"
                value={formik.values.discord}
                onChange={formik.handleChange}
                error={formik.touched.discord && Boolean(formik.errors.discord)}
                helperText={formik.touched.discord && formik.errors.discord}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                select
                name="ethnicity"
                id="ethnicity"
                label="Ethnicity"
                value={formik.values.ethnicity}
                onChange={formik.handleChange}
              >
                <MenuItem value={"Ethnicity 1"}>Ethnicity 1</MenuItem>
                <MenuItem value={"Ethnicity 2"}>Ethnicity 2</MenuItem>
                <MenuItem value={"Ethnicity 3"}>Ethnicity 3</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                select
                name="gender"
                id="gender"
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}
