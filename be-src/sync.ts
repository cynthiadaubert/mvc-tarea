import { sequelize } from "./models/connection";
import { User, Product } from "./models";

/* sequelize.sync({ alter: true }).then((res) => console.log(res)); */

// podemos usar el force si necesitamos resetear la base por completo
// sequelize.sync({ force: true }).then((res) => console.log(res));

/* sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");
  })
  .catch((error) => {
    console.log("Error al sincronizar la base de datos:", error);
  });
 */

// Eliminar la tabla existente
sequelize
  .drop()
  .then(() => {
    // Crear la tabla con la nueva definición del modelo
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log("Tabla creada correctamente");
  })
  .catch((error) => {
    console.error("Error al crear la tabla:", error);
  });
