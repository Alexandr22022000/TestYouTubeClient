import ChanelData from '../components/ChanelData';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.chanelData.data
});

export default connect(mapStateToProps)(ChanelData);