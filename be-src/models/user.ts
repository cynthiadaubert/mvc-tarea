import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection"; //importamos la conexion a la bd
import { Product } from "./product";

export class User extends Model {}

//los modelos y archivos tienen que estar escritos en SINGULAR

User.init(
  {
    fullname: DataTypes.STRING,
    bio: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

// CUANDO MODIFICAMOS ESTOS MODELOS, CORTAMOS LA TERMINAL Y HACEMOS UN SYNC PARA QUE SE ACTUALICE
