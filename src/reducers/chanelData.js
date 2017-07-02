import {REQUEST_CHANEL_DATA, REQUEST_LISTS, GET_LISTS, GET_CHANEL_DATA} from '../constants/actions';

const defaultState = {
    data: {
        logo: '',
        title: '',
        description: '',
        videos: '',
        listsCount: '',
        subscribers: '',
        views: '',
        comments: ''
    },
    lists: [],
    firstRequest: null
};

const chanelData = (state = defaultState, action) => {
    console.log(action);
    switch (action.type) {
        case REQUEST_CHANEL_DATA:
        case REQUEST_LISTS:
            return {...defaultState};

        case GET_CHANEL_DATA:
            if (action.data.items.length === 0) {
                return {
                    ...state,
                    lists: [],
                    data: {
                        logo: '',
                        title: 'none',
                        description: '',
                        videos: '',
                        listsCount: '',
                        subscribers: '',
                        views: '',
                        comments: ''
                    }
                };
            }

            if (state.firstRequest === null) {
                return {...state, firstRequest: action.data};
            }
            else {
                const {snippet, statistics} = action.data.items[0];
                return {
                    ...state,
                    lists: state.firstRequest.items,
                    data: {
                        logo: snippet.thumbnails.default.url,
                        title: snippet.title,
                        description: snippet.description,
                        videos: statistics.videoCount,
                        listsCount: state.firstRequest.items.length,
                        subscribers: statistics.subscriberCount,
                        views: statistics.viewCount,
                        comments: statistics.commentCount
                    }
                };
            }

        case GET_LISTS:
            if (state.firstRequest === null) {
                return {...state, firstRequest: action.data};
            }
            else {
                const {snippet, statistics} = state.firstRequest.items[0];
                return {
                    ...state,
                    lists: action.data.items,
                    data: {
                        logo: snippet.thumbnails.default.url,
                        title: snippet.title,
                        description: snippet.description,
                        videos: statistics.videoCount,
                        listsCount: action.data.items.length,
                        subscribers: statistics.subscriberCount,
                        views: statistics.viewCount,
                        comments: statistics.commentCount
                    }
                };
            }

        default:
            return state;
    }
};

export default chanelData;