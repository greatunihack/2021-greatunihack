import { FormEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    padding: "20px",
  },
  root: {
    padding: "30px",
  },
  fields: {
    marginTop: "20px",
  },
  button: {
    padding: "20px",
    marginTop: "20px",
  },
}));

export default function Contact() {
  const classes = useStyles();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post("/.netlify/functions/email", form)
      .then((res: { data: { result: string } }) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err.response.status);
      });
  };

  return (
    <Box>
      <Typography variant="h3" align="center" className={classes.title}>
        Contact Us
      </Typography>
      <Container className={classes.root}>
        <FormControl fullWidth={true}>
          <TextField
            required
            name="name"
            id="name"
            label="Name"
            variant="outlined"
            className={classes.fields}
            value={form.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <TextField
            required
            name="email"
            id="email"
            label="Email"
            variant="outlined"
            className={classes.fields}
            value={form.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <TextField
            required
            label="Message"
            variant="outlined"
            name="message"
            id="message"
            multiline={true}
            rows="10"
            className={classes.fields}
            value={form.message}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Box className={classes.button}>
            <Grid container spacing={2}>
              <Box className="form-submit">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={formSubmit}
                >
                  Send
                </Button>
              </Box>
            </Grid>
          </Box>
        </FormControl>
      </Container>
    </Box>
  );
}
