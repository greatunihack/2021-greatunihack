import {
  Box,
  Container,
  Grid,
  MenuItem,
  makeStyles,
  TextField,
  CssBaseline,
  Button,
  Card,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
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
    <>
      <Title
        title={pages.pageItems[0].name}
        description={pages.pageItems[0].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
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
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
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
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
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
                    error={
                      formik.touched.discord && Boolean(formik.errors.discord)
                    }
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
              <Box p={2} pl={0} pb={0}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
              <Box p={2} pl={0}>
                <Button variant="contained" color="primary">
                  Link Discord Account
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Box>
    </>
  );
}
