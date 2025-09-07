// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import path from "path";

process.loadEnvFile(".env");
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export class ShopController {
  static async homePage(req, res) {
    try {
      res
        .status(200)
        .sendFile(
          path.join(process.cwd(), "..", "client", "media", "index.html")
        );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el servidor: " + error.message });
    }
  }

  static async createPreferenceAPI(req, res) {
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
          success: "https://calcagni-gabriel-dev.vercel.app/api/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
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
  }

  static async successAPI(req, res) {
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
      return res.status(400).json({ message: "Faltan parámetros en la URL" });
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
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }
}
