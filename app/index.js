import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Placeholder } from 'react-router-async';
import { hookRedux } from 'hook-redux';
import hookScroll from 'hook-scroll';
import createHistory from 'history/createBrowserHistory';

import createStore from 'block/core/create'
import Application from 'page/application'
import errors from 'block/errors'
import SignModal from 'block/sign/modal'

import getRoutes from 'app/routes'

const store = createStore(window.__data);
const history = createHistory({
    basename: '/demo.bestplace.pro'
});

const hooks = [
    hookScroll({ history }),
    hookRedux({
        dispatch: store.dispatch
    })
];

BrowserRouter
    .init({
        history,
        hooks,
        errors,
        routes: getRoutes(store)
    })
    .then(({ Router, routerProps, callback }) => {
        render((
            <Provider store={store} key="provider">
                <Router {...routerProps}>
                    <SignModal />
                    <Application>
                        <Placeholder render={({ Component, componentProps }) => ( // eslint-disable-line react/jsx-no-bind
                            <Component {...componentProps} />
                        )} />
                    </Application>
                </Router>
            </Provider>
        ), document.getElementById('app'), callback);
    })
    .catch(console.error);
