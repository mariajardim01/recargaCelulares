import { PhoneNumber } from "./phone-protocol";

export type User = {
  name: string;
  description: string;
  cpf: string;
};

export type UserData = User & {
  id: number;
};

export type RegisterUserPhone = User & PhoneNumber;