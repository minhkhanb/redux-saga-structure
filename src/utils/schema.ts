export enum UserRole {
  Admin = 'Admin',
  Creator = 'Creator',
  Moderator = 'Moderator',
  User = 'User',
}

export enum UserState {
  New = 'New',
}

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  profileMediaUrl?: string;
  email: string;
  displayEmail?: string;
  firstName: string;
  lastName: string;
  timezone: string;
  phone?: string;
  company?: string;
  title?: string;
  bio?: string;
  socialLinks?: string;
  state: UserState;
  isVerified?: string;
  name: string;
  role: UserRole;
};
