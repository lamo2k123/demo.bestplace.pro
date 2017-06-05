// @flow
import React from 'react'
import { Link } from 'react-router-async'

import SignButton from 'block/sign/button'
import AuthProfile from 'block/auth/profile'

import style from './style'

const Header = () => (
    <header className={style['header']}>
        <Link to="/" className={style['header__logo']}>Best Place PRO</Link>
        <SignButton />
        <AuthProfile />
    </header>
);

Header.displayName = '[block] header';

export { Header as default };
