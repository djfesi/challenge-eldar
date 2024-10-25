import { AuthState } from "../../auth/interfaces/auth.interface";

export const initialAuthState: AuthState = {
  token: null,
  role: null,
  email: null,
  isAuthenticated: false,
};