import cors from "cors";

const ORIGENES_PERMITIDOS = ["http://localhost:5000", "http://localhost:3000"];

export const corsMiddleware = ({
  originesAceptados = ORIGENES_PERMITIDOS,
} = {}) => {
  cors({
    maxAge: 80400,
    methods: ["GET", "POST"],
    origin: (origen, callback) => {
      if (originesAceptados.includes(origen)) {
        return callback(null, true);
      }

      if (!origen) {
        return callback(null, true);
      }

      return callback(new Error("No está permitido por CORS"));
    },
  });
};
