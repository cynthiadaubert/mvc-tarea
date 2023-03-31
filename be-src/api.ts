import { sequelize } from "./models/connection";
import express from "express";
import * as path from "path";
import cors from "cors";
import { getProfile, updateProfile } from "./controllers/users-controller";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); //si no tenemos eso no nos va a parsear el body

app.post("/profile", async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "body is empty or incomplete" });
  }
  const updatedData = await updateProfile(1, req.body);
  /* console.log("soy la data", updatedData); */
  res.json(updatedData);
});

app.get("/profile", async (req, res) => {
  const profileData = await getProfile(1);
  res.json(profileData);
});

// PARA QUE SIRVA EL INDEX.HTML PERO TAMBIÉN TENGA EN CUENTA APARTE EL INDEX.JS
/* const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
}); */

app.use(express.static("dist"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server connected at 'http://localhost:${port}'`);
});
