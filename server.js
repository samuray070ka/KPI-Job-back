const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const homeRoutes = require('./routers/Home');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const jobRoutes = require('./routers/Job'); 
// Route prefix
app.use('/home', homeRoutes);
app.use('/job', jobRoutes);
app.use('/uploads', express.static('uploads'));
const authRoutes = require('./routers/Auth');
app.use('/auth', authRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});