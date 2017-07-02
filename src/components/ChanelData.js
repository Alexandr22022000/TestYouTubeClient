import React from 'react';
import '../styles/ChanelData.css';

const ChanelData = ({data}) => {
    const {logo, title, description, videos, listsCount, subscribers, views, comments} = data;

    if (title === '') {
        return null;
    }

    if (title === 'none') {
        return (
            <div className="channel-data">
                <h1 className="channel-data__title">Канал не найден</h1>
            </div>
        );
    }

    return (
        <div className="channel-data">
            <table>
                <tr>
                    <td>
                        <img className="channel-data__logo" id="channel-data__logo" src={logo}/>
                    </td>
                    <td className="channel-data__text">
                        <h1 className="channel-data__title" id="channel-data__title">{title}</h1>
                        <p className="channel-data__description" id="channel-data__description">{description}</p>
                    </td>
                    <td>
                        <p className="channel-data__statistics">{`Видео: ${videos}`}</p>
                        <p className="channel-data__statistics">{`Плейлисты: ${listsCount}`}</p>
                        <p className="channel-data__statistics">{`Подпищики: ${subscribers}`}</p>
                        <p className="channel-data__statistics">{`Просмотры: ${views}`}</p>
                        <p className="channel-data__statistics">{`Коментарии: ${comments}`}</p>
                    </td>
                </tr>
            </table>
        </div>
    );  
};

export default ChanelData;