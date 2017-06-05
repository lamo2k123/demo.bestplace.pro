// @flow
import { handleActions } from 'redux-actions-helpers'

import {
    authSuccess,
    logout
} from './actions'

const initialState: {|
    status: boolean,
    username: null | string
|} = {
    status  : false,
    username: null
};

export default handleActions({
    [authSuccess]: (state, { username }) => ({
        status: true,
        username
    }),
    [logout]: () => initialState
}, {
    initialState
})
