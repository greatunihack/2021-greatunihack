/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { Box, Card, Dialog, Grid, Typography } from "@material-ui/core";
import Title from "src/components/title";
import pages from "src/data/DashboardButtonData.json";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthContext } from "src/components/auth/AuthContext";
import PageHeaders from "src/components/headers";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  message: Yup.string()
    .required("Message required")
    .min(30, "Message too short!"),
});

export default function Contact() {
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(AuthContext);
  return (
    <>
      <PageHeaders title={pages.pageItems[3].name} />
      <Title
        title={pages.pageItems[3].name}
        description={pages.pageItems[3].description}
      ></Title>
      <Box m={2}>
        <Card>
          <Box p={2}>
            <Formik
              onSubmit={(values) => {
                axios
                  .post("/.netlify/functions/email", {
                    name: values.name,
                    email: values.email,
                    message: values.message,
                  })
                  .then(() => {
                    setMessageText("Submitted successfully!");
                    setMessageOpen(true);
                  })
                  .catch(() => {
                    setMessageText("Error: please contact dev@unicsmcr.com");
                    setMessageOpen(true);
                  });
              }}
              initialValues={{
                name: user && user != "loading" ? user.displayName : "",
                email: user && user != "loading" ? user.email : "",
                message: "",
              }}
              validationSchema={ValidationSchema}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth={true}>
                        <TextField
                          disabled
                          required
                          name="name"
                          id="name"
                          label="Name"
                          variant="outlined"
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth={true}>
                        <TextField
                          disabled
                          required
                          name="email"
                          id="email"
                          label="Email"
                          variant="outlined"
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth={true}>
                        <TextField
                          required
                          name="message"
                          id="message"
                          label="Message"
                          variant="outlined"
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline={true}
                          rows="10"
                          fullWidth
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
                            type="submit"
                          >
                            Send
                          </Button>
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
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
