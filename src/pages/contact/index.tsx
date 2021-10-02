/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { Box, Card, Dialog, Grid, Typography } from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

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
      .then((res: any) => {
        setMessageText("Submitted successfully!");
        setMessageOpen(true);
      })
      .catch((err: any) => {
        setMessageText("Error: please contact dev@unicsmcr.com");
        setMessageOpen(true);
      });
  };

  return (
    <>
      <Title
        title={pages.pageItems[3].name}
        description={pages.pageItems[3].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <TextField
                    required
                    name="name"
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={form.name}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <TextField
                    required
                    name="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={form.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <TextField
                    required
                    label="Message"
                    fullWidth
                    variant="outlined"
                    name="message"
                    id="message"
                    multiline={true}
                    rows="10"
                    value={form.message}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
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
    </>
  );
}
