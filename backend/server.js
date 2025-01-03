
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const articlesRoutes = require("./routes/articles");
const authRoutes = require("./routes/authentication");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Root Route - To Fix "Cannot GET /" Error
app.get('/', (req, res) => {
  res.send('Welcome to the News Application API');
});

app.use("/api/articles", articlesRoutes);
app.use("/api/authentication", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});





