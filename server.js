const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// ENV & INIT
dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const homeRoutes = require('./routers/Home');
const jobRoutes = require('./routers/Job');
const authRoutes = require('./routers/Auth');

app.use('/home', homeRoutes);
app.use('/job', jobRoutes);  // <-- JOB route ulandi
app.use('/auth', authRoutes);

// DATABASE
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});