import ChangeChanel from '../components/ChangeChanel';
import {connect} from 'react-redux';
import selectChanel from '../actions/selectChanel';

const mapDispatchToProps = {onClick: selectChanel};

export default connect(null, mapDispatchToProps)(ChangeChanel);