import React from 'react';
import '../styles/ChangeChanel.css';
import {REDSTAR_CHANEL_ID} from '../constants/request';

class ChangeChanel extends React.Component {
    render () {
        return (
            <div className="toolbar__changeChannel">
                <p className="toolbar__change-channel-button" onClick={this.onClick.bind(this)}>Сменить канал</p>
                <input className="toolbar__change-channel-input" id="toolbar__change-channel-input" title=""/>
            </div>
        );
    }

    componentWillMount () {
        this.props.onClick(REDSTAR_CHANEL_ID);
    }

    onClick () {
        this.props.onClick(document.getElementById('toolbar__change-channel-input').value);
    }
}

export default ChangeChanel;