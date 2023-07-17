import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const client = new PrismaClient();

async function run() {
  await client.adoptionRequirements.deleteMany();
  await client.petGallery.deleteMany();
  await client.pet.deleteMany();
  await client.org.deleteMany();

  const password_hash = await bcryptjs.hash("123456", 6);

  await Promise.all([
    client.org.create({
      data: {
        id: "30ab4c94-593c-4a5b-8249-54364ef77612",
        name: "Adote Pets",
        email: "adote_pets@email.com",
        address: "Avenida Paulista, 52",
        cep: 01310900,
        phone: 558699999999,
        password_hash,
      },
    }),
    client.org.create({
      data: {
        id: "24c7192d-1e26-4ced-bc65-2ae3a942d126",
        name: "Catinhos",
        email: "catinhos@email.com",
        address: "Avenida Paulista, 326",
        cep: 01310902,
        phone: 558699999998,
        password_hash,
      },
    }),
  ]);

  await Promise.all([
    client.pet.create({
      data: {
        id: "137d9eb5-aae2-4aa2-958a-525ec830dde9",
        name: "Caramelinho",
        city: "Sao Paulo",
        description: "Um doguinho para quem tem muito amor para dar",
        age: "cub",
        energy: 3,
        size: "medium",
        independence: "high",
        type: "dog",
        image_url: "caramelinho.jpeg",
        org_id: "30ab4c94-593c-4a5b-8249-54364ef77612",
      },
    }),
    client.pet.create({
      data: {
        id: "e12378c3-0870-48c4-8341-3e0f780c3201",
        name: "Yoda",
        description: "Um companheiro para todas as horas",
        city: "Sao Paulo",
        age: "adolescent",
        energy: 5,
        size: "small",
        independence: "low",
        type: "cat",
        image_url: "yoda.jpeg",
        org_id: "30ab4c94-593c-4a5b-8249-54364ef77612",
      },
    }),
    client.pet.create({
      data: {
        id: "94f3c2fb-806a-4624-b24e-88b925581dce",
        name: "Tigrão",
        description: "Um bom amigo para quem gosta de um dog mais quietinho",
        city: "Sao Paulo",
        age: "elderly",
        energy: 2,
        size: "big",
        independence: "medium",
        type: "dog",
        image_url: "tigrao.jpeg",
        org_id: "24c7192d-1e26-4ced-bc65-2ae3a942d126",
      },
    }),
  ]);

  await Promise.all([
    client.petGallery.create({
      data: {
        image_url: "caramelinho.jpeg",
        pet_id: "137d9eb5-aae2-4aa2-958a-525ec830dde9",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "caramelinho-1.jpeg",
        pet_id: "137d9eb5-aae2-4aa2-958a-525ec830dde9",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "caramelinho-2.jpeg",
        pet_id: "137d9eb5-aae2-4aa2-958a-525ec830dde9",
      },
    }),

    client.petGallery.create({
      data: {
        image_url: "yoda.jpeg",
        pet_id: "e12378c3-0870-48c4-8341-3e0f780c3201",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "yoda-1.jpeg",
        pet_id: "e12378c3-0870-48c4-8341-3e0f780c3201",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "yoda-2.jpeg",
        pet_id: "e12378c3-0870-48c4-8341-3e0f780c3201",
      },
    }),

    client.petGallery.create({
      data: {
        image_url: "tigrao.jpeg",
        pet_id: "94f3c2fb-806a-4624-b24e-88b925581dce",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "tigrao-1.jpg",
        pet_id: "94f3c2fb-806a-4624-b24e-88b925581dce",
      },
    }),
    client.petGallery.create({
      data: {
        image_url: "tigrao-2.jpeg",
        pet_id: "94f3c2fb-806a-4624-b24e-88b925581dce",
      },
    }),
  ]);

  await Promise.all([
    client.adoptionRequirements.create({
      data: {
        title: "Ter tempo para brincadeiras e passeios",
        pet_id: "137d9eb5-aae2-4aa2-958a-525ec830dde9",
      },
    }),
    client.adoptionRequirements.create({
      data: {
        title: "Não ter cachorros em casa",
        pet_id: "e12378c3-0870-48c4-8341-3e0f780c3201",
      },
    }),
    client.adoptionRequirements.create({
      data: {
        title: "Ter tempo para cuidar e dar atenção",
        pet_id: "94f3c2fb-806a-4624-b24e-88b925581dce",
      },
    }),
  ]);
}

run()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await client.$disconnect();
    process.exit(1);
  });
