import { spawn } from 'redux-saga/effects'
import sign from 'block/sign/saga'

export default function* rootSaga() {
    yield spawn(sign);
}
