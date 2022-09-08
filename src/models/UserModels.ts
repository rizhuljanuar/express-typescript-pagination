import { DataTypes } from "sequelize";
import db from "../config/Database";

const user = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default user;

// generate table, jika tidak ada di database
(async () => {
  await db.sync();
})();
