export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

export interface PasswordResetFormData {
  email:string;
  newPassword: string;
  repeatedNewPassword: string;
}

export interface PasswordResetFormErrors {
  email:string;
  newPassword: string;
  repeatedNewPassword: string;
}

export interface RegisterFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}