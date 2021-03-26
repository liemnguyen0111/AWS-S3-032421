// Use dotenv for any secret key
require("dotenv").config();

// Dependencies
const express = require("express");
const app = express();
const { join } = require("path")

// Middlewares

// Routes
app.use(require("./routes"));

// Serve any static files
app.use(express.static(join(__dirname, 'client', "build")))

// // Handle React routing
app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client","build", "index.html"))
})

// PORT
const PORT = process.env.PORT || 3006;

// Listener
app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
