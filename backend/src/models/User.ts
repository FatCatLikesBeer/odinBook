import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(190),
    allowNull: false,
    unique: true,
  },
  displayName: { type: DataTypes.STRING(190), allowNull: false },
  email: {
    type: DataTypes.STRING(190),
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING(190), allowNull: false },
  city: { type: DataTypes.STRING(190) },
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public"
  }
});

export { User };
