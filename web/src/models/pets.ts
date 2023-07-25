export type TPet = {
  id: string;
  name: string;
  description: string;
  city: string;
  age: string;
  energy: number;
  size: string;
  independence: string;
  type: string;
  image_url: string;
  org_id: string;
};

export interface IResponsePets {
  pets: TPet[];
}
