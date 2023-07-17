import { verifyJWT } from "@/http/middlewares/verify-jwt";
import uploadConfig from "@/utils/upload";
import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { createPet } from "./create-pet";
import { getPetDetails } from "./get-pet-details";
import { searchPets } from "./search-pets";

const upload = multer(uploadConfig);

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { onRequest: verifyJWT, preHandler: upload.array("images", 6) },
    createPet
  );
  app.get("/:city", searchPets);
  app.get("/details/:id", getPetDetails);
}
