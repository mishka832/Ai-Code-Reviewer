const express = require("express");
const cors = require("cors");
const reviewRouter = require("./routes/reviewroutes.js"); // import the controller
const dotenv = require("dotenv");

dotenv.config(); // MUST be at the top

// Debug API key
console.log(
  "OpenAI API key loaded:",
  process.env.OPENAI_API_KEY ? "YES" : "NO"
);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", reviewRouter); // POST /review calls reviewCode controller

// Optional root endpoint
// app.get("/", (req, res) => {
//   res.send("AI Code Reviewer Backend is running");
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
