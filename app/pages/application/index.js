import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Header from 'block/header'

import style from './style'

@connect((store) => ({
    modal: store.sign.modal
}))
class Application extends PureComponent {

    static displayName = '[page] application';

    props: {
        modal: boolean,
        children: ReactElement
    };

    componentDidMount() {
        const $data = document.getElementById('__data');

        if($data) {
            $data.outerHTML = '';
        }
    }

    render() {
        return (
            <div className={style['application']} data-blur={this.props.modal}>
                <Header />
                {this.props.children}
            </div>
        )
    }

}

export { Application as default }
