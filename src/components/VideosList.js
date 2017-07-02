import React from 'react';
import '../styles/VideosList.css';
import ListItem from './ListItem';

const VideosList = ({items, onClickItem}) => {
    let list = [];

    for (let key in items) {
        const {snippet} = items[key];

        list.push(<ListItem id={snippet.resourceId.videoId} onClick={onClickItem} title={snippet.title} description={snippet.description}/>);
    }

    return (
        <div className="videos-list">
            {list}
        </div>
    );
};

export default VideosList;