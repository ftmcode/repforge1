require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/* -----------------------------
   BASIC MIDDLEWARE ONLY
------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* -----------------------------
   VIEW ENGINE (SAFE)
------------------------------*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* -----------------------------
   DATABASE (NON-BLOCKING)
------------------------------*/
if (process.env.MONGODB_URI) {
  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('⚠️ MongoDB error:', err.message));
}

/* -----------------------------
   SIMPLE HOME ROUTE (IMPORTANT)
------------------------------*/
app.get('/', (req, res) => {
  res.send('🔥 RepForge is LIVE on Render');
});

/* -----------------------------
   HEALTH CHECK (RENDER DEBUG)
------------------------------*/
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/* -----------------------------
   OPTIONAL ROUTES (SAFE LOADING)
   - prevents crash if files missing
------------------------------*/
try {
  app.use('/auth', require('./routes/auth'));
  app.use('/dashboard', require('./routes/dashboard'));
  app.use('/bounties', require('./routes/bounties'));
  app.use('/portfolio', require('./routes/portfolio'));
  app.use('/analytics', require('./routes/analytics'));
  app.use('/ai', require('./routes/ai'));
  app.use('/api', require('./routes/apiProxy'));
  app.use('/', require('./routes/index'));
} catch (err) {
  console.log('⚠️ Route load error:', err.message);
}

/* -----------------------------
   404 HANDLER
------------------------------*/
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

/* -----------------------------
   START SERVER (RENDER SAFE)
------------------------------*/
app.listen(PORT, () => {
  console.log(🔥 RepForge running on port ${PORT});
});
