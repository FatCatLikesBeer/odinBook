import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const Like = sequelize.define("Like", {
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
});

export { Like };
