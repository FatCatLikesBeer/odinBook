import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const EventComment = sequelize.define("EventComment", {
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
      model: "Events",
      key: "id"
    }
  },
  body: DataTypes.TEXT,
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
});

export { EventComment };
