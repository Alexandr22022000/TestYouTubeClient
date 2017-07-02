import React from 'react';
import '../styles/Content.css';
import ListsList from './ListsList';
import VideosList from './VideosList';
import VideoData from './VideoData';

const Content = ({lists, videos, videoData, onClickList, onClickVideo}) => {
    let listsList = '', videosList = '', video = '';

    if (lists.length !== 0) {
        listsList = <ListsList items={lists} onClickItem={onClickList}/>;
    }

    if (videos.length !== 0) {
        videosList = <VideosList items={videos} onClickItem={onClickVideo}/>;
    }

    if (videoData.id !== '') {
        video = <VideoData data={videoData}/>;
    }

    return (
        <div className="content">
            <table>
                <tr>
                    <td className="content__cell">
                        {listsList}
                    </td>
                    <td className="content__cell">
                        {videosList}
                    </td>
                    <td className="content__cell">
                        {video}
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Content;