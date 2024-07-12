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
const Comment = sequelize.define("Comment", {
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
  parentType: {
    type: DataTypes.ENUM("post", "event")
  },
  parentId: DataTypes.UUID,
  body: DataTypes.TEXT,
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
});

export { Comment };
