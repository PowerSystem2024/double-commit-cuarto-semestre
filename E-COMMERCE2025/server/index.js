import express from "express";
import cors from "cors";
import { shopRouter } from "./routes/shopRouter.js";

process.loadEnvFile(".env");

const app = express();
const corsOption = {
  methods: ["GET", "POST"],
  maxAge: 86400,
};

app.use(cors(corsOption));
app.use(express.json());

// Uso de enrutamiento de la app
app.use("/", shopRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(
    `El servidor esta corriendo en el puerto http://localhost:${PORT}`
  );
});
