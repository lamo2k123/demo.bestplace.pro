import PropTypes from 'prop-types'
import React, { Component } from 'react'
import I18n from 'core-ui__i18n'
import LUIStaticBlock, { actions as actionsStaticBlock } from 'lib-ui__static-block'
import { fetcherItems } from 'page/application'
import { parse } from 'cookie'

import Label from 'block/label'
import FormInput from 'block/form-input'
import FormSelect from 'block/form-select'
import PasswordInput from 'block/password-input'

import style from './style'

import classNames from 'classnames/bind'

const classnames = classNames.bind(style);

class SignUp extends Component {

    static displayName = '[page] sign-up';

    static contextTypes = {
        router   : PropTypes.object,
        transport: PropTypes.object.isRequired
    };

    state = {
        email   : null,
        password: null,
        pending : false,
        valid   : false,
        error   : null
    };

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

    get partnerKey() {
        const cookie = parse(document.cookie);

        return cookie.partnerKey;
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        if(this.state.valid && !this.state.pending) {
            this.setState({
                pending: true
            });

            const $form     = e.currentTarget;
            const params    = {};
            const partnerKey= this.partnerKey;

            if(partnerKey) {
                params.partnerKey = partnerKey;
            }
            params['defaultCurrency'] = 'RUR';

            for(let i = 0; $form.length > i; i++) {
                const name = $form[i].name;
                const value= $form[i].value;

                switch(name) {
                    case 'email':
                    case 'password':
                    case 'lastName':
                    case 'firstName':
                    case 'middleName':
                    case 'gender':
                    case 'birthDate':
                    case 'countyCode':
                    case 'city':
                        params[name] = value;
                        break;
                    case 'mobilePhone':
                        value && (params[name] = value);
                        break;
                    case 'offerAccepted':
                        if(value === 'true') {
                            params[name] = true;
                        }
                        break;
                }
            }

            this.context.transport
                .publish('site./auth/v1', {
                    method: 'register',
                    params
                })
                .then(
                    () => {
                        this.setState({
                            pending: false
                        });

                        this.context.router.push({
                            pathname: '/sign-up-success',
                            query   : {
                                firstName: params.firstName,
                                lastName : params.lastName,
                                email    : params.email
                            }
                        })
                    },
                    (error) => this.setState({
                        error,
                        pending: false
                    })
                );
        }
    };

    get maxAttrBirthDay() {
        let date    = new Date(),
            year    = date.getFullYear() - 18,
            month   = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
            day     = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        return `${year}-${month}-${day}`;
    }

    get minAttrBirthDay() {
        let date    = new Date(),
            year    = date.getFullYear() - 100,
            month   = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
            day     = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        return `${year}-${month}-${day}`;
    }

    get elLabel() {
        const props = {
            tagName : Label,
            children: 'TK_MOBILE__LABEL_SIGN-UP',
            elBack  : false,
            closed  : -1
        };

        return <I18n {...props} />;
    }

    get elInputEmail() {
        const props ={
            name         : 'email',
            type         : 'email',
            title        : <I18n>TK_MOBILE__SIGN-UP-FORM_EMAIL-LABEL</I18n>,
            description  : <I18n>TK_MOBILE__SIGN-UP-FORM_EMAIL-DESC</I18n>,
            required     : true,
            onChangeValue: (email) => this.setState({
                email
            }),
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
        const props = {
            name         : 'password',
            title        : <I18n>TK_MOBILE__SIGN-UP-FORM_PASSWORD-LABEL</I18n>,
            className    : classnames('sign-up__border'),
            required     : true,
            onChangeValue: (password) => this.setState({
                password
            })
        };

        return <PasswordInput {...props} />
    }

    get elInputPasswordRepeat() {
        const props ={
            name          : 'password-repeat',
            type          : 'password',
            className     : classnames('sign-up__border'),
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_PASSWORD-REPEAT-LABEL</I18n>,
            required      : true,
            elEye         : true,
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-PASSWORD_REQUIRED');
                } else if(node.value !== this.state.password) {
                    node.setCustomValidity('TK_MOBILE__ERROR-PASSWORD_NOT-EQUAL');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elLastName() {
        const props ={
            name          : 'lastName',
            type          : 'text',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_LAST-NAME-LABEL</I18n>,
            required      : true,
            className     : classnames('sign-up__border'),
            pattern       : '^[a-zA-Zа-яА-Я\\d]+$',
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-NAME_REQUIRED');
                } else if(node.validity.patternMismatch) {
                    node.setCustomValidity('TK_MOBILE__ERROR-NAME_PATTERN');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elFirstName() {
        const props ={
            name          : 'firstName',
            type          : 'text',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_FIRST-NAME-LABEL</I18n>,
            required      : true,
            pattern       : '^[a-zA-Zа-яА-Я\\d]+$',
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-NAME_REQUIRED');
                } else if(node.validity.patternMismatch) {
                    node.setCustomValidity('TK_MOBILE__ERROR-NAME_PATTERN');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elMiddleName() {
        const props ={
            name          : 'middleName',
            type          : 'text',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_MIDDLE-NAME-LABEL</I18n>,
            required      : false,
            pattern       : '^[a-zA-Zа-яА-Я\\d]*$',
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('');
                } else if(node.validity.patternMismatch) {
                    node.setCustomValidity('TK_MOBILE__ERROR-NAME_PATTERN');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elBirthDate() {
        const props ={
            name          : 'birthDate',
            type          : 'date',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_BIRTH-DAY-LABEL</I18n>,
            description   : <I18n className={classnames('sign-up__desc')} data-age="18+">TK_MOBILE__SIGN-UP-FORM_BIRTH-DAY-DESC</I18n>,
            required      : true,
            className     : classnames('sign-up__border'),
            max           : this.maxAttrBirthDay,
            min           : this.minAttrBirthDay,
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-BIRTH-DAY_REQUIRED');
                } else if(node.value === '1834-08-01') {
                    node.setCustomValidity('TK_MOBILE__ERROR-BIRTH-DAY_EASTER-EGGS-1');
                } else if(node.validity.rangeUnderflow) {
                    node.setCustomValidity('TK_MOBILE__ERROR-BIRTH-DAY_OLD');
                } else if(node.validity.rangeOverflow) {
                    node.setCustomValidity('TK_MOBILE__ERROR-BIRTH-DAY_YOUNG');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elCity() {
        const props ={
            name          : 'city',
            type          : 'text',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_CITY-LABEL</I18n>,
            required      : true,
            pattern       : '^[\\w\\dа-яА-ЯёЁ,.-]+$',
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.valueMissing) {
                    node.setCustomValidity('TK_MOBILE__ERROR-CITY_REQUIRED');
                } else if(node.validity.patternMismatch) {
                    node.setCustomValidity('TK_MOBILE__ERROR-CITY_PATTERN');
                }
            }
        };

        return <FormInput {...props} />
    }

    get elMobilePhone() {
        const props ={
            name          : 'mobilePhone',
            type          : 'tel',
            title         : <I18n>TK_MOBILE__SIGN-UP-FORM_TEL-LABEL</I18n>,
            pattern       : '^(8|\\+7)(([\\s)(.-]+)?\\d{1}){10}$',
            placeholder   : '+7',
            className     : classnames('sign-up__border'),
            customValidity: (node) => {
                node.setCustomValidity('');

                if(node.validity.patternMismatch) {
                    if(!/^(8|\+7)/.test(node.value)) {
                        node.setCustomValidity('TK_MOBILE__ERROR-TEL_REGION');
                    } else {
                        node.setCustomValidity('TK_MOBILE__ERROR-TEL_PATTERN');
                    }
                }
            }
        };

        return <FormInput {...props} />
    }

    get elGender() {
        const props ={
            name     : 'gender',
            title    : <I18n>TK_MOBILE__SIGN-UP-FORM_GENDER-LABEL</I18n>,
            required : true,
            className: classnames('sign-up__border'),
            children : [{
                title: 'TK_MOBILE__SIGN-UP-FORM_GENDER-OPTION-MALE',
                value: 'male'
            }, {
                title: 'TK_MOBILE__SIGN-UP-FORM_GENDER-OPTION-FEMALE',
                value: 'female'
            }]
        };

        return <FormSelect {...props} />
    }

    get elCountyCode() {
        const props ={
            name        : 'countyCode',
            title       : <I18n>TK_MOBILE__SIGN-UP-FORM_COUNTRY-LABEL</I18n>,
            required    : true,
            className   : classnames('sign-up__border'),
            defaultValue: 'RU',
            disabled    : true,
            children    : [{
                title: 'TK_MOBILE__SIGN-UP-FORM_COUNTRY-OPTION-RU',
                value: 'RU'
            }]
        };

        return <FormSelect {...props} />
    }

    get error() {
        if(this.state.error) {
            return <span className={classnames('sign-up__error')}>{this.state.error.message || this.state.error.code}</span>
        }
    }

    render() {
        return (
            <div className={classnames('sign-up')}>
                {this.elLabel}
                <form onSubmit={this.onSubmitForm} onChange={this.onChangeForm} className={classnames('sign-up__form')}>
                    {this.elInputEmail}
                    {this.elInputPassword}
                    {this.elInputPasswordRepeat}
                    {this.elLastName}
                    {this.elFirstName}
                    {this.elMiddleName}
                    {this.elGender}
                    {this.elBirthDate}
                    {this.elCountyCode}
                    {this.elCity}
                    {this.elMobilePhone}
                    <label className={`${classnames('sign-up__label')} ${classnames('sign-up__border')}`} data-type="checkbox">
                        <input name="offerAccepted" type="checkbox" value="true" required={true} />
                        <span className={classnames('sign-up__checkbox-title')}>
                            <LUIStaticBlock id="agreement" />
                        </span>
                    </label>
                    <I18n className={classnames('sign-up__desc', 'sign-up__desc_margin_15')}>TK_MOBILE__SIGN-UP_FIELD-REQUIRED-DESCRIPTION</I18n>
                    {this.error}
                    <I18n tagName="button" className={classnames('sign-up__button')} type="submit" disabled={!this.state.valid} data-pending={this.state.pending}>TK_MOBILE__SIGN-UP-FORM_ENTER</I18n>
                </form>
            </div>
        )
    }

}

export default {
    path   : '/sign-up',
    action : () => SignUp,
    fetcher: [
        ...fetcherItems,
        {
            promise: ({ helpers: { store: { dispatch }, container } }) => {
                return container.transport
                    .publish('site./content/v1', {
                        method: 'getStaticTextBlock',
                        params: {
                            name: 'agreement'
                        }
                    })
                    .then(
                        (payload) => {
                            dispatch(actionsStaticBlock.add(payload))
                        }
                    );
            }
        }
    ]
}
