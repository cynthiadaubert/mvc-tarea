import { User, Product } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createProduct(userId: number, productData) {
  if (!userId) {
    throw "userId is necessary";
  }
  const user = await User.findByPk(userId);
  if (user) {
    const product = await Product.create({
      ...productData,
      userId: user.get("id"),
    });
    return product;
  } else {
    throw "error, user not found";
  }
}

// Esta funcion no va a recibir nada relacionado al req y res, sino lo minimo y necesaRIO
//para crear un producto. (Algunos modelos usan igual el req y res acá). Va a ser mucho mejor
//dejar toda la lógica acá y no en los endpoints porque así va a ser mas facil hacer chequeos,etc.

// Los endpoints van a ser agnósticos, no tienen que entender que estan siendo importados por express,
// por eso podemos usar el throw en transacciones.

//Al tener las tres capas separadas, va a ser muy fácil identificar por donde vienen los problemas

export async function updateProfile(userId, updatedData) {
  if (updatedData.picURL) {
    const img = await cloudinary.uploader.upload(updatedData.picURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 500,
    });
    /*  return console.log("console", updatedData.fullname, updatedData.bio); */
    const completeData = {
      /*  fullname: updatedData.fullname, */
      bio: updatedData.bio,
      pictureURL: img.secure_url,
    };

    await User.update(completeData, { where: { id: userId } });

    return completeData;
  } else {
    console.error("no hay imagen");
  }
}
export async function getProfile(userId) {
  const userProfile = await User.findByPk(userId);
  return userProfile;
}
