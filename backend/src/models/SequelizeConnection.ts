import { Sequelize } from "sequelize";
require('dotenv').config();

const database = String(process.env.DBDEV);
const user = String(process.env.DBUSER);
const password = String(process.env.DBPASSWORD);
const url = process.env.DB_URL;

const sequelize = new Sequelize(database, user, password, {
  host: url,
  dialect: 'mariadb',
  dialectOptions: {
    allowPublicKeyRetrieval: true,
  }
});

export default sequelize;
