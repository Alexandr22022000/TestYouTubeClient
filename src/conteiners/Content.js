import Content from '../components/Content';
import {connect} from 'react-redux';
import selectList from '../actions/selectList';
import selectVideo from '../actions/selectVideo';

const mapStateToProps = (state) => ({
    lists: state.chanelData.lists,
    videos: state.videos.videos,
    videoData: state.videoData
});

const mapDispatchToProps = (dispatch) => ({
    onClickList (id) {
        dispatch(selectList(id));
    },

    onClickVideo (id) {
        dispatch(selectVideo(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);