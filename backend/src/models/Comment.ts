import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  parentType: {
    type: DataTypes.ENUM("post", "event")
  },
  parentId: DataTypes.INTEGER,
  body: DataTypes.TEXT,
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
});

export { Comment };
