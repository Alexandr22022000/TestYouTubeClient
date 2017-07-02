import {REQUEST_CHANEL_DATA, GET_CHANEL_DATA, REQUEST_LISTS, GET_LISTS, REQUEST_VIDEOS, GET_VIDEOS, REQUEST_VIDEO_DATA, GET_VIDEO_DATA, REQUEST_ERROR} from '../constants/actions';

const defaultState = {
    status: 'Готово'
};

const status = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_CHANEL_DATA:
        case REQUEST_LISTS:
        case REQUEST_VIDEOS:
        case REQUEST_VIDEO_DATA:
            return {...state, status: 'Ожидание...'};

        case GET_CHANEL_DATA:
        case GET_LISTS:
        case GET_VIDEOS:
        case GET_VIDEO_DATA:
            return {...state, status: 'Готово'};

        case REQUEST_ERROR:
            return {...state, status: `Ошибка ${action.error}`};

        default:
            return state;
    }
};

export default status;