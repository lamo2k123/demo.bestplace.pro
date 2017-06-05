// @flow
import { createAction } from 'redux-actions-helpers';

export const authSuccess = createAction('@@auth/SUCCESS', (username: string) => ({
    username
}));

export const logout = createAction('@@auth/LOGOUT');

export default {
    authSuccess,
    logout
}
