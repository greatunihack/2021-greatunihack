const client = require("@sendgrid/mail");

const { SENDGRID_API_KEY, CONTACT_EMAIL, FROM_EMAIL } = process.env;

exports.handler = async function (event) {
  const { name, email, message } = JSON.parse(event.body);
  client.setApiKey(SENDGRID_API_KEY);

  try {
    await client.send({
      to: CONTACT_EMAIL,
      from: FROM_EMAIL,
      subject: `New message from ${name} (${email})`,
      html: message,
    });
    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
