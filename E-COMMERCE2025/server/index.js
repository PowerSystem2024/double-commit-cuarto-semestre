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

app.get("/success", async (req, res) => {
  const {
    collection_id,
    collection_status,
    payment_id,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  } = req.query;

  if (!collection_status || !payment_id) {
    return res.json({ message: "Parámetros faltantes" });
  }

  const data = {
    collection_id,
    collection_status,
    payment_id,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  };

  try {
    res.send(`
      <div>
        <h1>Muchas gracias por tu compra</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `);
    console.log("Query params:", req.query);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
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
        success: "http://localhost:3000/success",
        failure: "/failure",
        pending: "",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
      result,
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
