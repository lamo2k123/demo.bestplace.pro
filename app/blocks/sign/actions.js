// @flow
import { createAction } from 'redux-actions-helpers';

export const modal = createAction('@@sign/MODAL', (modal: boolean) => ({
    modal
}));

export const signIn = createAction('@@sign/IN');

export const signUp = createAction('@@sign/UP');

export default {
    modal,
    signIn,
    signUp
}
