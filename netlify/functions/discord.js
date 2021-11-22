/* eslint-disable @typescript-eslint/no-var-requires */

exports.handler = async function (event) {
  const DiscordOauth2 = require("discord-oauth2");
  const oauth = new DiscordOauth2();
  const discordTokenRequest = await oauth
    .tokenRequest({
      clientId: process.env.REACT_APP_DISCORD_CLIENT,
      clientSecret: process.env.REACT_APP_DISCORD_SECRET,
      code: JSON.parse(event.body).code,
      scope: ["identify", "guilds.join"],
      grantType: "authorization_code",
      redirectUri: JSON.parse(event.body).redirect,
    })
    .catch((err) => {
      return {
        statusCode: err.code,
      };
    });
  return {
    statusCode: 200,
    body: discordTokenRequest.access_token,
  };
};
