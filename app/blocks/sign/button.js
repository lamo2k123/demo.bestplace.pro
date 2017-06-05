// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Dispatch } from './types'
import actions from './actions'
import style from './style'

@connect((store) => ({
    auth: store.auth.status
}))
class SignButton extends PureComponent {

    static displayName = '[block] sign/button';

    static defaultProps = {
        elIn: true,
        elUp: true
    };

    props: {|
        elIn: boolean,
        elUp: boolean,
        auth: boolean,
        dispatch: Dispatch
    |};

    onClick = (type) => (e) => {
        this.props.dispatch(actions[type]());

        e.preventDefault();
    };

    get elIn() {
        if(this.props.elIn) {
            return <a href="#sign-in" className={style['sign-button__in']} onClick={this.onClick('signIn')}>Sign In</a>
        }
    }

    get elUp() {
        if(this.props.elUp) {
            return <a href="#sign-up" className={style['sign-button__up']} onClick={this.onClick('signUp')}>Sign Up</a>
        }
    }

    render() {
        if(!this.props.auth && (this.props.elUp || this.props.elIn)) {
            return (
                <div className={style['sign-button']}>
                    {this.elIn}
                    {this.elUp}
                </div>
            )
        } else {
            return null
        }
    }

}

export { SignButton as default };
