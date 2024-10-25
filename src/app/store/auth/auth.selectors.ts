import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../auth/interfaces/auth.interface';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.role
);

export const selectUserEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.email
);
