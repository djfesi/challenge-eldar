export interface AuthState {
  token: string | null;
  role: string | null;
  email: string | null;
  isAuthenticated: boolean;
}
