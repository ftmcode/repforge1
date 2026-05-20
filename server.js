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

// DB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/repforge')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('⚠️  MongoDB error (running without DB):', err.message));

// Security + Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "za-images.s3.us-west-2.amazonaws.com", "za-mainnet.s3.us-west-2.amazonaws.com"],
      connectSrc: ["'self'", "https://zeroauthoritydao.com", "https://api.anthropic.com"]
    }
  }
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'repforge-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
};

if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });
}
app.use(session(sessionConfig));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global locals for all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/bounties', require('./routes/bounties'));
app.use('/portfolio', require('./routes/portfolio'));
app.use('/analytics', require('./routes/analytics'));
app.use('/ai', require('./routes/ai'));
app.use('/api', require('./routes/apiProxy'));

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 — RepForge' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { title: 'Error — RepForge', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🔥 RepForge running on http://localhost:${PORT}`);
});
