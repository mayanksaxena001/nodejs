'use strict';
import express from 'express';
import morgan from 'morgan';
import expressConfig from './config/express';
import router from './routes/router';
import sequelize from './config/database.seq.config';
import passport from './config/passport.config';
import config from './config/config.json';
import views from './config/views.config';
import dotenv from 'dotenv';
import path from 'path';
const env = process.env.NODE_ENV || "development";

class Server {
    constructor() {
        this.app = express();
        this.config = config[env];
        this.init();
    }

    init() {
        dotenv.load();
        // HTTP request logger
        this.app.use(morgan('dev'));
        this.app.use((err, req, res, next) => {
            if (err) {
                console.error(err.stack);
                res.send(err);
            }
            else {
                next();
            }
        })
        //passport
        passport(this.app);
        // express settings
        expressConfig(this.app);
        router(this.app);
        //views
        views(this.app);
        this.app.use(express.static(path.join(__dirname, '/public')));
        // start server
        this.app.listen(this.config.port, () => {
            // connect to database
            console.log(`[Server] listening on port ${this.config.port}`);
        });
    }
}

export default new Server().app;
