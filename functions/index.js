const { https, logger } = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();
const db = admin.firestore();

const twilioClient = twilio(
  functions.config().twilio.sid,
  functions.config().twilio.token
);

exports.sendOrderSMS = https.onCall(async (data, context) => {
  try {
    // Fetch order details and customer information from Firestore
    const order = await db.collection("orders").doc(data.orderId).get();
    const orderData = order.data();
    const customer = await db.collection("customers").doc(data.customerId).get();
    const customerData = customer.data();

    // Compose the SMS message
    const message = `New Cake Order:
    Order Details: ${JSON.stringify(orderData)}
    Customer Info: ${JSON.stringify(customerData)}`;

    // Send the SMS
    await twilioClient.messages.create({
      body: message,
      from: "+1234567890", // Your Twilio phone number
      to: "+9876543210", // Owner's phone number
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new https.HttpsError("internal", "Failed to send SMS");
  }
});
