const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
 * Create an OAuth2 client with the given credentials and return it
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (e) {
    return getNewToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization and return the new token
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored");
        return oAuth2Client;
      } catch (e) {
        console.log("Error writing new token to file:", e);
      }
    });
  });
}

const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("credentials.json", (err, content) => {
      if (err) reject("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Sheets API.
      resolve(authorize(JSON.parse(content)));
    });
  });
};
