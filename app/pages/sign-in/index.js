import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-async'
import I18n from 'core-ui__i18n'
import { actions } from 'lib-ui__account'
import { connect } from 'react-redux'
import { fetcherItems } from 'page/application'

import FormInput from 'block/form-input'
import Label from 'block/label'
import LinkItem from 'block/link-item'
import Warning from 'block/warning'

import style from './style'

import classNames from 'classnames/bind'

const classnames = classNames.bind(style);

@connect((state) => ({
    authPending: state.account.authPending,
    authStatus : state.account.authStatus,
    authError  : state.account.authError, // eslint-disable-line no-multi-spaces
    authAccess : state.router.location.query.access
}))
class SignIn extends Component {

    static displayName = '[page] sign-in';

    static propTypes = {
        authPending: PropTypes.bool,
        authStatus : PropTypes.bool,
        authError  : PropTypes.object,
        authAccess : PropTypes.object
    };

    static contextTypes = {
        router   : PropTypes.object,
        transport: PropTypes.object.isRequired,
        store    : PropTypes.object
    };

    state = {
        valid: false
    };

    componentWillReceiveProps(props) {
        if(!this.props.authStatus && this.props.authPending && props.authStatus && !props.authPending) {
            this.context.router.push('/');
        }
    }

    componentWillUnmount() {
        this.context.store.dispatch(
            actions.authErrorClean()
        );
    }

    onChangeForm = (e) => {
        const $form = e.currentTarget;
        const valid = [];

        for(let i = 0; i < $form.length; i++) {
            valid.push($form[i].validity.valid);
        }

        this.setState({
            valid: !valid.some((item) => !item)
        });
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        if(this.state.valid) {
            const $form     = e.currentTarget;
            const params    = {};

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

            this.context.store.dispatch(
                actions.auth(this.context.transport, params.login, params.password)
            );
        }
    };

    get label() {
        const props = {
            tagName : Label,
            children: 'TK_MOBILE__LABEL_SIGN-IN',
            elBack  : false,
            closed  : -1
        };

        return <I18n {...props} />;
    }

    get elInputLogin() {
        const props ={
            name          : 'login',
            type          : 'email',
            title         : <I18n>TK_MOBILE__SIGN-IN-FORM_LOGIN-LABEL</I18n>,
            width         : 60,
            required      : true,
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-EMAIL_REQUIRED');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elInputPassword() {
        const props ={
            name          : 'password',
            type          : 'password',
            title         : <I18n>TK_MOBILE__SIGN-IN-FORM_PASSWORD-LABEL</I18n>,
            className     : classnames('sign-in__border'),
            width         : 60,
            required      : true,
            elEye         : true,
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-PASSWORD_REQUIRED');
                }
            }
        };

        return <FormInput {...props} />
    }

    get disabled() {
        return this.props.authPending || !this.state.valid;
    }

    get elError() {
        if(this.props.authError) {
            return <span className={classnames('sign-in__error')}>{this.props.authError.message}</span>
        }
    }

    get signUpCode() {
        const props = {
            linkTo  : '/sign-up-code',
            children: 'TK_MOBILE__SIGN-IN_LINK-SIGN-UP-CODE'
        };

        return <LinkItem {...props} />
    }

    get signUp() {
        const props = {
            linkTo  : '/sign-up',
            children: 'TK_MOBILE__SIGN-IN_LINK-REGISTRATION'
        };

        return <LinkItem {...props} />
    }

    get elLoginInfo() {
        if(this.props.authAccess !== undefined) {
            const props = {
                iconType: 'info',
                children: <I18n>TK_MOBILE__SIGN-IN-ACCESS_TRUE</I18n>
            };

            return <Warning {...props} />
        }
    }

    render() {
        return (
            <div className={classnames('sign-in')}>
                {this.label}
                {this.elLoginInfo}
                <form onSubmit={this.onSubmitForm} onChange={this.onChangeForm}>
                    {this.elInputLogin}
                    {this.elInputPassword}
                    <I18n tagName={Link} to="/forgot-password" className={classnames('sign-in__forgot-password')}>TK_MOBILE__SIGN-IN-FORM_FORGOT-PASSWORD</I18n>
                    {this.elError}
                    <I18n tagName="button" className={classnames('sign-in__button')} type="submit" data-pending={this.props.authPending} disabled={this.disabled}>TK_MOBILE__SIGN-IN-FORM_ENTER</I18n>
                </form>
                {this.signUpCode}
                {this.signUp}
            </div>
        )
    }

}

export default {
    path   : '/sign-in',
    action : () => SignIn,
    fetcher: fetcherItems
}
