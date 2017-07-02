import React from 'react';
import '../styles/VideoData.css';

const VideoData = ({data}) => {
    const {id, title, description, likeCount, dislikeCount, viewCount, commentCount} = data;

    return (
        <div className="video">
            <iframe width="800" height="450" src={`https://www.youtube.com/embed/${id}`} frameborder="0" allowfullscreen/>
            <h1 className="video__title">{title}</h1>
            <p className="video__description">{description}</p>
            <table>
                <tr>
                    <td>
                        <p className="video__statistics">{`Нравится: ${likeCount}`}</p>
                    </td>
                    <td>
                        <p className="video__statistics">{`Ненравится: ${dislikeCount}`}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p className="video__statistics">{`Просмотры: ${viewCount}`}</p>
                    </td>
                    <td>
                        <p className="video__statistics">{`Коментарии: ${commentCount}`}</p>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default VideoData;