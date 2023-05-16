export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  roles: Array<Role>;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  user: User;
  couriers: Array<User>;
}

export interface Role {
  roleId: string;
  name: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  type: string;
  location: string;
  contact: Contact;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  details: string;
  measuring_unit: string;
  image_url: string;
}

export interface Context {
  state: {
    user: User;
  };
}

export interface ProductBody {
  name: string;
  details: string;
  measuring_unit: string;
  image_url: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
