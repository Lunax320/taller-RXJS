export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  role?: string;
  company?: {
    title: string;
    department?: string;
  };
  address?: {
    city: string;
  };
}

export interface DummyUserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}