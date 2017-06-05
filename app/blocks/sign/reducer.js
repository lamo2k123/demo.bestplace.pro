import { handleActions } from 'redux-actions-helpers'
import type { State } from './types'
import {
    modal,
    signIn,
    signUp
} from './actions'

const initialState: State = {
    modal: false,
    in   : false,
    up   : false
};

export default handleActions({
    [modal]: (state, { modal }) => ({
        modal,
        in: modal && state.in,
        up: modal && state.up
    }),
    [signIn]: (state) => ({
        ...state,
        in: true,
        up: false
    }),
    [signUp]: (state) => ({
        ...state,
        in: false,
        up: true
    })
}, {
    initialState
})
