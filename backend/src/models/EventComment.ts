import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const EventComment = sequelize.define("EventComment", {
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
