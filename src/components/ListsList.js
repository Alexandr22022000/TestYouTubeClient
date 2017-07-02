import React from 'react';
import '../styles/ListsList.css';
import ListItem from './ListItem';

const ListsList = ({items, onClickItem}) => {
    let list = [];

    for (let key in items) {
        const {id, snippet, contentDetails} = items[key];

        list.push(<ListItem id={id} onClick={onClickItem} title={snippet.title} description={`${contentDetails.itemCount} видео`} logo={snippet.thumbnails.medium.url}/>);
    }

    return (
        <div className="lists-list">
            {list}
        </div>
    );
};

export default ListsList;