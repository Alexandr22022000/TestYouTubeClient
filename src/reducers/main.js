import {combineReducers} from 'redux';
import chanelData from './chanelData';
import status from './status';
import videos from './videos';
import videoData from './videoData';

const mainReducer = combineReducers({
    status,
    chanelData,
    videos,
    videoData
});

export default mainReducer;