// @flow
import { fork, put, select, takeEvery } from 'redux-saga/effects'

import { authSuccess } from 'block/auth/actions'
import {
    signIn,
    signUp,
    modal
} from './actions';

export function* effectModal() {
    const status = yield select((store) => store.sign.modal);

    if(!status) {
        yield put(modal(true))
    }
}

export function* effectClose() {
    const status = yield select((store) => store.sign.modal);

    if(status) {
        yield put(modal(false))
    }
}

export default function* signSaga() {
    yield fork(takeEvery, signIn, effectModal);
    yield fork(takeEvery, signUp, effectModal);
    yield fork(takeEvery, authSuccess, effectClose);
}
