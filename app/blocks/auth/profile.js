// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { logout } from './actions'
import style from './style'

@connect((store) => ({
    status  : store.auth.status, // eslint-disable-line no-multi-spaces
    username: store.auth.username
}))
class AuthProfile extends PureComponent {

    static displayName = '[block] auth/profile';

    static defaultProps = {
        elLogout: true,
        elAvatar: true
    };

    props: {|
        elLogout: boolean,
        elAvatar: boolean,
        status: boolean,
        username: null | string,
        dispatch: (action: {}) => {}
    |};

    onClick = (e) => {
        this.props.dispatch(logout());

        e.preventDefault();
    };

    get elAvatar() {
        if(this.props.elAvatar) {
            const props = {
                className: style['auth-profile__avatar'],
                src      : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=40',
                srcSet   : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=80 2x'
            };

            return <img {...props} />
        }
    }

    get elLogout() {
        if(this.props.elLogout) {
            return <a href="#" className={style['auth-profile__logout']} onClick={this.onClick}>Logout</a>
        }
    }

    render() {
        if(this.props.status) {
            return (
                <div className={style['auth-profile']}>
                    {this.elAvatar}
                    <strong className={style['auth-profile__username']}>{this.props.username}</strong>
                    {this.elLogout}
                </div>
            )
        } else {
            return null
        }
    }

}

export { AuthProfile as default };
