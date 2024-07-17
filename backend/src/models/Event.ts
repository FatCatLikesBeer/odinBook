import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const Event = sequelize.define("Event", {
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
  title: {
    type: DataTypes.STRING(190),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: DataTypes.TEXT("long"), // This will be an array in JSON
  location: {
    type: DataTypes.STRING(190),
    defaultValue: "/public/default_event.png",
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  externalLink: DataTypes.STRING(190),
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
  visibility: {
    type: DataTypes.ENUM("published", "draft", "deleted"),
    defaultValue: "draft",
  },
});

export { Event };
