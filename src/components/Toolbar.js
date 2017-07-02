import React from 'react';
import '../styles/Toolbar.css';
import StatusIcon from '../conteiners/StatusIcon';
import ChangeChanel from '../conteiners/ChangeChanel';

const Toolbar = () => (
    <div className="toolbar">
        <div className="toolbar__status-icon">
            <StatusIcon/>
        </div>
        <div className="toolbar__change-chanel">
            <ChangeChanel/>
        </div>
    </div>
);

export default Toolbar;