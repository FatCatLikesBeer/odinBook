import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const PostLike = sequelize.define("PostLike", {
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
  parentId: {
    type: DataTypes.UUID,
    references: {
      model: "Posts",
      key: "id"
    }
  },
});

export { PostLike };
