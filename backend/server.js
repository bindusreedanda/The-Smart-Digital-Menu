require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (Fix for images not loading)
app.use(express.static(path.join(__dirname, "../")));  // Serve frontend
app.use('/Images', express.static(path.join(__dirname, "../Images"))); // Serve images

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Order Schema
const OrderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    table: Number,
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalPrice: Number,
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

// API to place order
app.post("/order", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to get images (For debugging)
app.get("/test-image/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../Images", req.params.filename);
    res.sendFile(filePath);
});

// Serve frontend (Fix for opening `1st page.html` correctly)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../1st page.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
