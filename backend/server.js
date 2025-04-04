const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Config = require('./models/Config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'zealthy'
})
.then(async () => {
  console.log('Connected to MongoDB');
  // 确保存在默认配置
  const config = await Config.findOne();
  if (!config) {
    await Config.create(Config.getDefaultConfig());
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// User Routes
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Config Routes
app.get('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    if (!config) {
      const defaultConfig = await Config.create(Config.getDefaultConfig());
      return res.json(defaultConfig);
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    if (!config) {
      const newConfig = await Config.create(req.body);
      return res.json(newConfig);
    }
    Object.assign(config, req.body);
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for testing
module.exports = app; 