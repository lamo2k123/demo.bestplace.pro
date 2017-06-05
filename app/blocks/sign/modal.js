// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Dispatch } from './types'
import { modal } from './actions'
import FormIn from './form-in'
import FormUp from './form-up'
import style from './style'

@connect((store) => ({
    modal: store.sign.modal,
    in   : store.sign.in, // eslint-disable-line no-multi-spaces
    up   : store.sign.up // eslint-disable-line no-multi-spaces
}), null, null, {
    withRef: true
})
class SignModal extends PureComponent {

    static displayName = '[block] sign/modal';

    static defaultProps = {
        elIn: true,
        elUp: true
    };

    props: {|
        elIn: boolean,
        elUp: boolean,
        in: boolean,
        up: boolean,
        modal: boolean,
        dispatch: Dispatch
    |};

    onKeyDown = ({ which }) => {
        if(which === 27 && this.props.modal) {
            this.props.dispatch(modal(false))
        }
    };

    onClickOverlay = (e) => {
        if(e.target === e.currentTarget) {
            this.onClick(e);
        }
    };

    onClick = (e) => {
        this.props.dispatch(modal(false));

        e.preventDefault();
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown)
    }

    get elContent() {
        if(this.props.in) {
            return <FormIn />
        } else if(this.props.up) {
            return <FormUp />
        }
    }

    render() {
        if(this.props.modal && (this.props.elIn || this.props.elUp)) {
            return (
                <div className={style['sign-modal']} onClick={this.onClickOverlay}>
                    <div className={style['sign-modal__window']}>
                        <a href="#" className={style['sign-modal__close']} onClick={this.onClick}>ESC or</a>
                        {this.elContent}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

}

export { SignModal as default };
