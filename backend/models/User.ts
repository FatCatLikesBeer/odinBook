import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';
// import { Sequelize, DataTypes } from "sequelize";
// require('dotenv').config();
//
// const database = String(process.env.DB);
// const user = String(process.env.DBUSER);
// const password = String(process.env.DBPASSWORD);
// const url = String(process.env.DBURL);
//
// const sequelize = new Sequelize(database, user, password, {
//   host: url,
//   dialect: 'mariadb',
//   dialectOptions: {
//     allowPublicKeyRetrieval: true,
//   }
// });

// Model Definition
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userName: { type: DataTypes.STRING, allowNull: false },
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.TEXT },
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public"
  }
});

export { User };
