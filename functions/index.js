const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Basic endpoint for testing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// Endpoint to create a payment intent
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total);

    // Validate total amount
    if (isNaN(total) || total <= 0) {
      return res.status(400).json({
        message: "Invalid total amount. Total must be a positive number.",
      });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // Send back the client secret to the client
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on Port: ${PORT}, http://localhost:${PORT}`);
});
