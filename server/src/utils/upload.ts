import { env } from "@/env";
import crypto from "crypto";
import multer from "fastify-multer";
import path from "path";

const tmpFolder =
  env.NODE_ENV === "dev"
    ? path.resolve(__dirname, "..", "..", "uploads")
    : path.resolve(__dirname, "..", "uploads");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
