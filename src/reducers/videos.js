import {REQUEST_VIDEOS, GET_VIDEOS, REQUEST_CHANEL_DATA, REQUEST_LISTS} from '../constants/actions';

const defaultState = {
    videos: []
};

const videos = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_VIDEOS:
        case REQUEST_CHANEL_DATA:
        case REQUEST_LISTS:
            return {...defaultState};

        case GET_VIDEOS:
            return {...state, videos: action.data.items};

        default:
            return state;
    }
};

export default videos;