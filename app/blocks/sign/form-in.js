// @flow
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-async'

import { authSuccess } from 'block/auth/actions'
import style from './style'

class SignFormIn extends PureComponent {

    static displayName = '[block] sign/form-in';

    static defaultProps = {
        elButtonReset: true,
        elError      : true
    };

    static contextTypes = {
        store: PropTypes.object
    };

    props: {|
        elButtonReset: boolean,
        elError: boolean
    |};

    state: {|
        error: null | string
    |} = {
        error: null
    };

    onReset = () => {
        this.setState({
            error: null
        })
    };

    onSubmit = (e) => {
        const $form = e.currentTarget;
        const params = {};

        for(let i = 0; $form.length > i; i++) {
            const name = $form[i].name;
            const value= $form[i].value;

            switch(name) {
                case 'login':
                case 'password':
                    params[name] = value;
                    break;
            }
        }

        const res = fetch('https://httpbin.org/post', {
            method: 'POST',
            body  : JSON.stringify(params)
        });

        res
            .then(
                (result) => result.json(),
                console.error
            )
            .then((result) => {
                console.log('DATA', result);

                // Fake Auth & data
                this.context.store.dispatch(authSuccess('Aleksey Bugurtovich'))
            });

        e.preventDefault();
    };

    onInvalid = (e) => {
        e.preventDefault();

        this.setState({
            error: e.currentTarget.validationMessage
        });
    };

    get elButtonReset() {
        if(this.props.elButtonReset) {
            return <button type="reset" className={style['sign-form__button']} tabIndex={4}>Reset</button>;
        }
    }

    get elError() {
        if(this.props.elError && this.state.error) {
            return <div className={style['sign-form__error']}>{this.state.error}</div>
        }
    }

    render() {
        return (
            <form className={style['sign-form']} onSubmit={this.onSubmit} onReset={this.onReset}>
                <h4 className={style['sign-form__header']}>Authorization</h4>
                <label className={style['sign-form__label']}>
                    <strong className={style['sign-form__title']}>Login</strong>
                    <input name="login" type="text" className={style['sign-form__input']} pattern="[\w]+" onInvalid={this.onInvalid} required={true} tabIndex={1} autoFocus={true} />
                </label>
                <label className={style['sign-form__label']}>
                    <strong className={style['sign-form__title']}>Password</strong>
                    <input name="password" type="password" className={style['sign-form__input']} onInvalid={this.onInvalid} tabIndex={2} required={true} />
                </label>
                <Link to="/forgot-password" className={style['sign-form__forgot']}>Forgot password?</Link>
                {this.elError}
                <div className={style['sign-form__footer']}>
                    {this.elButtonReset}
                    <button type="submit" className={style['sign-form__button']} tabIndex={3}>Enter</button>
                </div>
            </form>
        )
    }

}

export { SignFormIn as default };
