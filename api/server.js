require('dotenv').config();

// Express for endpoint server
const express = require('express');
// Cors to allow cross domain usage.
const cors = require('cors');
// Helmet for secured backend information
const helmet = require('helmet');
// Morgan for local dev logging
const morgan = require('morgan');
// Express Session for using session.
const session = require('express-session');
// KnexSessionStorage for tracking and managing sessions in the DB.
const KnexSessionStorage = require('connect-session-knex')(session);
// Session Configuration
const sessionConfig = require('./sessionConfig').config(KnexSessionStorage);

// Import Routers
const authRouter = require('./routers/auth/auth-router');

// Define server
const server = express();

//Global Middleware 
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(session(sessionConfig));

// Implement Routers
server.get('/api/', (req,res) =>{
    res.status(200).json({message: "Sessions implemented and live!", session: req.session});
});

server.use('/api/auth', authRouter);


// Potentially crashing Heroku

// /* STATIC ENDPOINTS */

// Public documentation of API
server.use('/', express.static(`${__dirname}/public`));
// Catchall endpoint 404
server.use('/*',express.static(`${__dirname}/public/404/`));

module.exports = server;