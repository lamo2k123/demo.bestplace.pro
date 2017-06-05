import React, { PureComponent } from 'react'
import { Link } from 'lib-ui__link'
import I18n from 'core-ui__i18n'

import style from './style'

// eslint-disable-next-line react/prefer-stateless-function
class Sign extends PureComponent {

    static displayName = '[block] sign';

    componentWillEnter(cb) {
        setTimeout(cb, 600);
        this.$root.classList.add(style['sign_animation-open']);
    }

    componentDidEnter() {
        this.$root.classList.remove(style['sign_animation-open']);
    }

    componentWillLeave(cb) {
        setTimeout(cb, 600);
        this.$root.classList.add(style['sign_animation-closed']);
    }

    componentDidLeave() {
        this.$root.classList.remove(style['sign_animation-closed']);
    }

    render() {
        return (
            <div ref={(node) => { this.$root = node }} className={style['sign']}>
                <I18n tagName={Link} to="/sign-in" className={style['sign__in']}>TK_MOBILE__AUTH-BUTTON_LOGIN</I18n>
                <I18n tagName={Link} to="/sign-up" className={style['sign__up']}>TK_MOBILE__AUTH-BUTTON_REGISTRATION</I18n>
            </div>
        )
    }

}

export { Sign as default, style };
