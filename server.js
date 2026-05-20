require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

/* -----------------------------
   DATABASE CONNECTION
------------------------------*/
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('⚠️ MongoDB connection failed:', err.message));

/* -----------------------------
   MIDDLEWARE
------------------------------*/
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* -----------------------------
   SESSION CONFIG
------------------------------*/
app.use(session({
  secret: process.env.SESSION_SECRET || 'repforge-dev-secret',
  resave: false,
  saveUninitialized: false,
  store: process.env.MONGODB_URI
    ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    : undefined,
  cookie: {
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

/* -----------------------------
   VIEW ENGINE
------------------------------*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* -----------------------------
   GLOBAL VARIABLES
------------------------------*/
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

/* -----------------------------
   ROUTES
------------------------------*/
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/bounties', require('./routes/bounties'));
app.use('/portfolio', require('./routes/portfolio'));
app.use('/analytics', require('./routes/analytics'));
app.use('/ai', require('./routes/ai'));
app.use('/api', require('./routes/apiProxy'));

/* -----------------------------
   HEALTH CHECK (RENDER SAFE)
------------------------------*/
app.get('/health', (req, res) => {
  res.status(200).send('RepForge OK');
});

/* -----------------------------
   404 HANDLER
------------------------------*/
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

/* -----------------------------
   ERROR HANDLER
------------------------------*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

/* -----------------------------
   START SERVER (RENDER SAFE)
------------------------------*/
app.listen(PORT, () => {
  console.log(🔥 RepForge running on http://localhost:${PORT});
});
