import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from 'app/sagas'

const sagaMiddleware = createSagaMiddleware();

export default (data) => {
    const middleware = [
        sagaMiddleware
    ];

    if(__DEVELOPMENT__) {
        const { createLogger } = require('redux-logger');
        const logger = createLogger({
            duration : true,
            collapsed: true,
            diff     : true
        });

        middleware.push(logger);
    }

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const reducers = require('app/reducers').default;
    const store = createStoreWithMiddleware(reducers, data);

    sagaMiddleware.run(sagas);

    if(__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./../../reducers', () => {
            store.replaceReducer(require('./../../reducers').default);
        });
    }

    return store;
};
