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
const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  images: DataTypes.JSON, // This will be an array in JSON
  location: DataTypes.STRING,
  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,
  externalLink: DataTypes.STRING,
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
  visibility: {
    type: DataTypes.ENUM("published", "draft", "deleted"),
    defaultValue: "draft",
  },
});

export { Event };
