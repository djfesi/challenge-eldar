import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { email, token, role }) => ({
    ...state,
    email,
    token: token,
    role: role,
    isAuthenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    email: null,
    token: null,
    role: null,
    isAuthenticated: false,
  }))
);
