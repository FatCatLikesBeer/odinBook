import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const PostLike = sequelize.define("PostLike", {
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
      model: "Posts",
      key: "id"
    }
  },
});

export { PostLike };
