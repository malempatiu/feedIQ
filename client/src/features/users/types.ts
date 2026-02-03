export type LoginFormData = {
  email: string;
  password: string;
}
export type LoginFormErrors = LoginFormData;

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export type RegisterFormErrors = RegisterFormData;

export type PasswordResetFormData = {
  email:string;
  newPassword: string;
  repeatedNewPassword: string;
}
export type PasswordResetFormErrors = PasswordResetFormData;
