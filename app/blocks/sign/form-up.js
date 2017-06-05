// @flow
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { authSuccess } from 'block/auth/actions'
import style from './style'

class SignFormUp extends PureComponent {

    static displayName = '[block] sign/form-up';

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
        error: null | string,
        gender: Array<{|
            label: string,
            value: string
        |}>
    |} = {
        error : null,
        gender: [{
            label: 'Male',
            value: 'male'
        }, {
            label: 'Female',
            value: 'female'
        }]
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
                case 'first-name':
                case 'last-name':
                case 'username':
                case 'age':
                case 'gender':
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
            return <button type="reset" className={style['sign-form__button']} tabIndex={7}>Reset</button>;
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
                <h4 className={style['sign-form__header']}>Registration</h4>
                <div className={style['sign-form__safe-zone']}>
                    <label className={style['sign-form__label']}>
                        <strong className={style['sign-form__title']}>First Name</strong>
                        <input name="first-name" type="text" className={style['sign-form__input']} onInvalid={this.onInvalid} required={true} tabIndex={1} autoFocus={true} />
                    </label>
                    <label className={style['sign-form__label']}>
                        <strong className={style['sign-form__title']}>Last Name</strong>
                        <input name="last-name" type="text" className={style['sign-form__input']} onInvalid={this.onInvalid} required={true} tabIndex={2} />
                    </label>
                    <label className={style['sign-form__label']}>
                        <strong className={style['sign-form__title']}>Username</strong>
                        <input name="username" type="text" className={style['sign-form__input']} onInvalid={this.onInvalid} required={true} tabIndex={3} />
                    </label>
                    <label className={style['sign-form__label']}>
                        <strong className={style['sign-form__title']}>Age</strong>
                        <input name="age" type="number" min="0" max="120" className={style['sign-form__input']} onInvalid={this.onInvalid} required={true} tabIndex={4} />
                        <span className={style['sign-form__desc']}>Сигэтиё Идзуми (яп. 泉 重千代, 29 июня 1865, посёлок Исен на острове Токуносима, Государство Рюкю, ныне префектура Кагосима — 21 февраля 1986, там же) — считался самым старым мужчиной в мире, прожившим 120 лет и 237 дней.</span>
                    </label>
                    <label className={style['sign-form__label']}>
                        <strong className={style['sign-form__title']}>Gender</strong>
                        <select name="gender" className={style['sign-form__select']} tabIndex={5}>
                            {this.state.gender.map(({ value, label }, index) => (
                                <option key={index} value={value}>{label}</option>
                            ))}
                        </select>
                    </label>
                </div>
                {this.elError}
                <div className={style['sign-form__footer']}>
                    {this.elButtonReset}
                    <button type="submit" className={style['sign-form__button']} tabIndex={6}>Sign Up</button>
                </div>
            </form>
        )
    }

}

export { SignFormUp as default };
