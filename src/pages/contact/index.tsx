/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card } from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

const useStyles = makeStyles(() => ({
  fields: {
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
      <Title
        title={pages.pageItems[3].name}
        description={pages.pageItems[3].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
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
              <Box mt={2} className="form-submit">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={formSubmit}
                >
                  Send
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
