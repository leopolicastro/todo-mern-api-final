// import db
require('./db/config');

const express = require('express'),
  userRouter = require('./routes/secure/users'),
  cookieParser = require('cookie-parser'),
  taskRouter = require('./routes/secure/tasks'),
  openRoutes = require('./routes/open'),
  passport = require('./middleware/authentication'),
  path = require('path'),
  app = express(),
  morgan = require('morgan'),
  fileUpload = require('express-fileupload');

// Parse incoming JSON into objects
app.use(express.json());
app.use(morgan('dev'));

app.use(
  '/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

app.use(
  '/api/auth/facebook',
  passport.authenticate('facebook', {
    scope: 'email',
    session: false
  })
);
// Unauthenticated routes
app.use('/api/auth', openRoutes);

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);

//  Authenticated  Routes
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

module.exports = app;
