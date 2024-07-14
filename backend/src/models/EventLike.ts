import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const EventLike = sequelize.define("EventLike", {
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
});

export { EventLike };
