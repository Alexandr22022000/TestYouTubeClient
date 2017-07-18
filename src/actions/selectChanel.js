import {REQUEST_CHANEL_DATA, GET_CHANEL_DATA, REQUEST_LISTS, GET_LISTS, REQUEST_ERROR} from '../constants/actions';
import {URL, KEY} from '../constants/request';
import axios from 'axios';

const requestChanelData = () => ({
    type: REQUEST_CHANEL_DATA
});

const getChanelData = (data) => ({
    type: GET_CHANEL_DATA,
    data
});

const requestLists = () => ({
    type: REQUEST_LISTS
});

const getLists = (data) => ({
    type: GET_LISTS,
    data
});

const requestError = (error) => ({
    type: REQUEST_ERROR,
    error
});

const selectChanel = (id) => (dispatch) => {
    dispatch(requestChanelData());

    axios.get(`${URL}channels`, {
        params: {
            key: KEY,
            id,
            part: 'statistics,snippet'
        }
    })
        .then(function (response) {
            dispatch(getChanelData(response.data));
        })
        .catch(function (error) {
            dispatch(requestError(error));
        });

    dispatch(requestLists());

    axios.get(`${URL}playlists`, {
        params: {
            key: KEY,
            part: 'snippet,contentDetails',
            channelId: id,
            maxResults: '25'
        }
    })
        .then(function (response) {
            dispatch(getLists(response.data));
        })
        .catch(function (error) {
            dispatch(requestError(error));
        });
};

export default selectChanel;