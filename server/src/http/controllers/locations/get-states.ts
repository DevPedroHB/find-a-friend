import { makeGetStatesUseCase } from "@/use-cases/factories/make-locations-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getStates(_request: FastifyRequest, reply: FastifyReply) {
  const getStatesUseCase = makeGetStatesUseCase();

  const { states } = await getStatesUseCase.execute();

  return reply.status(200).send({
    states,
  });
}
