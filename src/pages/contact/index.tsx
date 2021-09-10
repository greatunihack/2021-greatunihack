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
    padding: "10px",
  },
  subhead: {
    marginTop: "10px",
  },
  fields: {
    marginTop: "10px",
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
      .post("/api/sendmail", data)
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
      <Typography variant="h4" align="center" className={classes.title}>
        Contact Us
      </Typography>
      <Container className={classes.root}>
        <FormControl fullWidth={true}>
          <Typography variant="h6" className={classes.subhead}>
            Name
          </Typography>
          <TextField
            required
            id="full-name"
            name="name"
            variant="filled"
            className={classes.fields}
            value={data.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <Typography variant="h6" className={classes.subhead}>
            Email
          </Typography>
          <TextField
            required
            id="email"
            name="email"
            variant="filled"
            className={classes.fields}
            value={data.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <Typography variant="h6" className={classes.subhead}>
            Message
          </Typography>
          <TextField
            required
            variant="filled"
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
