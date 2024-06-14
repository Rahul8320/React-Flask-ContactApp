export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
};

export type AddOrUpdateContactModel = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
};
