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
  title: DataTypes.STRING(190),
  description: DataTypes.TEXT,
  images: DataTypes.TEXT("long"), // This will be an array in JSON
  location: DataTypes.STRING(190),
  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,
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
