import jwt from "jsonwebtoken";
import path from "path"

export const createAccessToken = (payload) => {
  process.loadEnvFile(path.join(process.cwd(), ".env"));
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 1000 },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    );
  });
};
