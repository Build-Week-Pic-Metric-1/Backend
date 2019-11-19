const knexConnection = require('./knexConfig');

const config = (KnexSessionStorage) =>{
    return {
        name: 'pmetric-1',
        secret: process.env.COOKIE_SECRET || 'not really safe',
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: 'auto',
            sameSite: 'none',
            httpOnly:false,

        },
        resave: false,
        saveUninitialized: true, //Only for BW Project
        store: new KnexSessionStorage({
            knex: knexConnection,
            clearInterval: 1000 * 60 * 10, //Deletes expired sessions every 10 minutes
            tablename: 'user_sessions',
            sidfieldname: 'id',
            createtable: true,
        }),
    }
};

module.exports = {
    config,
}