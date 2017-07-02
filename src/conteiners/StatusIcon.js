import StatusIcon from '../components/StatusIcon';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    status: state.status.status
});

export default connect(mapStateToProps)(StatusIcon);