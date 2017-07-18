import Content from '../components/Content';
import {connect} from 'react-redux';
import selectList from '../actions/selectList';
import selectVideo from '../actions/selectVideo';

const mapStateToProps = (state) => ({
    lists: state.chanelData.lists,
    videos: state.videos.videos,
    videoData: state.videoData
});

const mapDispatchToProps = {
    onClickList: selectList,
    onClickVideo: selectVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);