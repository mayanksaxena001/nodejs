import Sequelize from 'sequelize';
import Promise from 'bluebird';
import path from 'path';
const env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
class Database {
    constructor() {
        this.database = config.database;
        this.sequelize = new Sequelize(this.database.database, this.database.username, this.database.password, this.database);
        this.init();
    }

    init() {
        this.sequelize.Promise = Promise;
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

    }
}
export default new Database().sequelize;