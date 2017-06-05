import { combineReducers } from 'redux'
import { reducer as router } from 'hook-redux'

import sign from 'block/sign/reducer'
import auth from 'block/auth/reducer'

export default combineReducers({
    router,
    sign,
    auth
});
