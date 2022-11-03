export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotFormValues {
  email: string;
}

export interface ResetFormValues {
  auth?: string;
  password: string;
  passwordRepeat: string;
}

export interface VerificationFormValues {
  code: string;
  email?: string;
  rememberMe?: boolean;
}

export interface SignUpFormValuesRequest {
  firstName: string;
  lastName: string;
  email: string;
  personalNumber: string;
  workNumber: string;
  id?: number;
  roleId?: number | string;
  password: string;
  passwordConfirmation: string;
}

export interface HttpErrorResponse {
  message: string;
}
