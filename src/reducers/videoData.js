import {REQUEST_VIDEO_DATA, GET_VIDEO_DATA, REQUEST_CHANEL_DATA, REQUEST_LISTS, REQUEST_VIDEOS} from '../constants/actions';

const defaultState = {
    id: '',
    title: '',
    description: '',
    likeCount: '',
    dislikeCount: '',
    viewCount: '',
    commentCount: ''
};

const videoData = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_VIDEO_DATA:
        case REQUEST_CHANEL_DATA:
        case REQUEST_LISTS:
        case REQUEST_VIDEOS:
            return {...defaultState};

        case GET_VIDEO_DATA:
            const {id, snippet, statistics} = action.data.items[0];
            return {
                id,
                title: snippet.title,
                description: snippet.description,
                likeCount: statistics.likeCount,
                dislikeCount: statistics.dislikeCount,
                viewCount: statistics.viewCount,
                commentCount: statistics.commentCount
            };

        default:
            return state;
    }
};

export default videoData;