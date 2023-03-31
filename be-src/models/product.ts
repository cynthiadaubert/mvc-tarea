import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection"; //importamos la conexion a la bd
import { User } from "./user";

export class Product extends Model {}

//los modelos y archivos tienen que estar escritos en SINGULAR

Product.init(
  // el modelo que creamos necesita que le definamos los campos
  // (columnas de la tabla) y para eso nos da Datatypes:
  {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "product",
  }
);

// Product.belongsTo(User); Nos va a dar un error de dependencia circular (quién se crea primero)
