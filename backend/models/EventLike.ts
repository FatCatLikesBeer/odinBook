import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const EventLike = sequelize.define("EventLike", {
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
});

export { EventLike };
