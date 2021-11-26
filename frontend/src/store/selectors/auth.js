import { createSelector } from '@reduxjs/toolkit';

export const authSelector = (state) => state.auth;

export const displayNameSelector = createSelector(authSelector, auth => auth.displayName);

export const emailSelector = createSelector(authSelector, auth => auth.email);

export const isUserAuthenticatedSelector = createSelector(authSelector, auth => auth.authenticated);

export const errorSelector = createSelector(authSelector, auth => auth.error);