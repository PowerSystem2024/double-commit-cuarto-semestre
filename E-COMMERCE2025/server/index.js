import express from "express";
import cors from "cors";
import path from "path";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales

process.loadEnvFile(".env");
const accessToken = process.env.MP_ACCESS_TOKEN;

const client = new MercadoPagoConfig({
  accessToken: accessToken,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Hola soy el server y este es tu token!! " + accessToken || "Naa mentira..."
  );
});

app.get("/succes", async (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    res.status(500).send("Error perro");
  }
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "/success",
        failure: "/failure",
        pending: "",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
});

app.listen(port, () => {
  console.log(
    `El servidor esta corriendo en el puerto http://localhost:${port}`
  );
});
