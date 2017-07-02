import {GET_VIDEOS, REQUEST_VIDEOS, REQUEST_ERROR} from '../constants/actions';
import {KEY, URL} from '../constants/request';
import axios from 'axios';

const requestVideos = () => ({
    type: REQUEST_VIDEOS
});

const getVideos = (data) => ({
    type: GET_VIDEOS,
    data
});

const requestError = (error) => ({
    type: REQUEST_ERROR,
    error
});

const selectList = (id) => (dispatch) => {
    dispatch(requestVideos());

    axios.get(`${URL}playlistItems`, {
        params: {
            key: KEY,
            playlistId: id,
            part: 'snippet,contentDetails',
            maxResults: '25'
        }
    })
        .then(function (response) {
            console.log(response);
            dispatch(getVideos(response.data));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(requestError(error));
        });
};

export default selectList;