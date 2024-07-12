import { DataTypes } from "sequelize";
import sequelize from './SequelizeConnection';

// Model Definition
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.TEXT },
  privacy: {
    type: DataTypes.ENUM("public", "following"),
    defaultValue: "public"
  }
});

export { User };
