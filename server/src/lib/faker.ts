import { Faker, en, pt_BR } from "@faker-js/faker";

export const customFaker = new Faker({ locale: [pt_BR, en] });
