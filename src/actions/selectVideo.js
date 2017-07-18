import {GET_VIDEO_DATA, REQUEST_VIDEO_DATA, REQUEST_ERROR} from '../constants/actions';
import {KEY, URL} from '../constants/request';
import axios from 'axios';

const requestVideoData = () => ({
    type: REQUEST_VIDEO_DATA
});

const getVideoData = (data) => ({
    type: GET_VIDEO_DATA,
    data
});

const requestError = (error) => ({
    type: REQUEST_ERROR,
    error
});

const selectVideo = (id) => (dispatch) => {
    dispatch(requestVideoData());

    axios.get(`${URL}videos`, {
        params: {
            key: KEY,
            id,
            part: 'snippet,statistics'
        }
    })
        .then(function (response) {
            dispatch(getVideoData(response.data));
        })
        .catch(function (error) {
            dispatch(requestError(error));
        });
};

export default selectVideo;