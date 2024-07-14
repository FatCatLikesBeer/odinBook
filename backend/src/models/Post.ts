import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const Post = sequelize.define("Post", {
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
  title: DataTypes.STRING,
  body: DataTypes.TEXT,
  type: {
    type: DataTypes.ENUM("text", "link", "image"),
  },
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
  visibility: {
    type: DataTypes.ENUM("published", "draft", "deleted"),
    defaultValue: "draft",
  },
});

export { Post };
