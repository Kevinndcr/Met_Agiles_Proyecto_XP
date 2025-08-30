export type Address = {
  linea1: string;
  ciudad: string;
  pais: string;
  zip: string;
};

export type User = {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  direcciones?: Address[];
};

export type UpdateUserInput = Partial<Omit<User, "_id">>;