import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const PostCommentLike = sequelize.define("PostCommentLike", {
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
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: "PostComments",
      key: "id"
    }
  },
});

export { PostCommentLike };
