import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

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

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    sent: false,
    buttonText: "Submit",
    err: "",
  });

  // eslint-disable-next-line
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const formSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setData({
      ...data,
      buttonText: "Sending",
    });

    axios
      .post("/functions/sendmail", data)
      .then((res: { data: { result: string } }) => {
        if (res.data.result !== "success") {
          setData({
            ...data,
            buttonText: "Failed to send",
            sent: false,
            err: "fail",
          });
          setTimeout(() => {
            resetForm();
          }, 6000);
        } else {
          setData({
            ...data,
            sent: true,
            buttonText: "Sent",
            err: "success",
          });
          setTimeout(() => {
            resetForm();
          }, 6000);
        }
      })
      // eslint-disable-next-line
      .catch((err: any) => {
        console.log(err.response.status);
        setData({
          ...data,
          buttonText: "Failed to send",
          err: "fail",
        });
      });
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      message: "",
      sent: false,
      buttonText: "Submit",
      err: "",
    });
  };

  return (
    <div>
      <Typography variant="h3" align="center" className={classes.title}>
        Contact Us
      </Typography>
      <Container className={classes.root}>
        <FormControl fullWidth={true}>
          <TextField
            required
            name="name"
            label="Name"
            variant="outlined"
            className={classes.fields}
            value={data.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <TextField
            required
            name="email"
            label="Email"
            variant="outlined"
            className={classes.fields}
            value={data.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <TextField
            required
            label="Message"
            variant="outlined"
            name="message"
            multiline={true}
            rows="10"
            className={classes.fields}
            value={data.message}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <div className={classes.button}>
            <Grid container spacing={2}>
              <div className="form-submit">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={formSubmit}
                >
                  {data.buttonText}
                </Button>
              </div>
            </Grid>
          </div>
        </FormControl>
      </Container>
    </div>
  );
}
