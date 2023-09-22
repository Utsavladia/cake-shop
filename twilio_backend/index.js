const functions = require("firebase-functions");
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();

// Twilio credentials (replace with your own)
const accountSid = "AC4e8b4adaeb185f5fad2c018dcb9b568a";
const authToken = "d577d61ac84f6691446a9d03136b21ab";
const twilioPhoneNumber = "+12568261458";

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Use the cors middleware to enable CORS
app.use(cors());

app.use(express.json());

app.post("/send-sms", (req, res) => {
  const {to, body} = req.body;

  // Send the SMS
  client.messages
      .create({
        body,
        from: twilioPhoneNumber,
        to,
      })
      .then((message) => {
        console.log("SMS sent:", message.sid);
        res.status(200).json({message: "SMS sent successfully"});
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).json({error: "Error sending SMS"});
      });
});

// Export the Express app as a Firebase Function
exports.smsFunction = functions.https.onRequest(app);
