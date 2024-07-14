import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const Rsvp = sequelize.define("Rsvp", {
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
  parent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Events",
      key: "id"
    }
  },
  going: {
    type: DataTypes.ENUM("going", "maybe", "notGoing"),
  },
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public",
  },
});

export { Rsvp };
