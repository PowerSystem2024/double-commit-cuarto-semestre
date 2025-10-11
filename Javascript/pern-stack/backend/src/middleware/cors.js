import cors from "cors";

const ORIGENES_PERMITIDOS = ["http://localhost:5000", "http://localhost:3000", "http://127.0.0.1:5500/Javascript/pern-stack/src/tests/test.html"];

export const corsMiddleware = ({
  originesAceptados = ORIGENES_PERMITIDOS,
} = {}) => {
  cors({
    maxAge: 80400,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: (origen, callback) => {
      if (originesAceptados.includes(origen)) {
        return callback(null, true);
      }

      // if (!originesAceptados) {
      //   return callback(null, true);
      // }

      return callback(new Error("No está permitido por CORS"));
    },
  });
};
