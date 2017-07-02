import ChangeChanel from '../components/ChangeChanel';
import {connect} from 'react-redux';
import selectChanel from '../actions/selectChanel';

const mapDispatchToProps = (dispatch) => ({
    onClick (id) {
        dispatch(selectChanel(id));
    }
});

export default connect(null, mapDispatchToProps)(ChangeChanel);