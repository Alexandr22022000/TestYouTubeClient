$(document).ready(() => {
    selectChannel('UCFjOsuEC53SL4GWpeO7b7Ww');

    console.log('start')
});

/*
---Обновление интерфейса---
 */

let channelData = {
    update(data, listsCount)  {
        $('#channel-data__logo').show();
        $('#channel-data__logo').attr('src', data.snippet.thumbnails.high.url);
        $('#channel-data__title').html(data.snippet.title);
        $('#channel-data__description').html(data.snippet.description);

        $('#channel-data__videos').html(`Видео: ${data.statistics.videoCount}`);
        $('#channel-data__lists').html(`Плейлисты: ${listsCount}`);
        $('#channel-data__subscribers').html(`Подпищики: ${data.statistics.subscriberCount}`);
        $('#channel-data__views').html(`Просмотры: ${data.statistics.viewCount}`);
        $('#channel-data__comments').html(`Коментарии: ${data.statistics.commentCount}`);
    },

    notFound() {
        $('#channel-data__logo').hide();
        $('#channel-data__title').html('Канал не найден!');
        $('#channel-data__description').html('');
        $('#channel-data__videos').html('');
        $('#channel-data__lists').html('');
        $('#channel-data__subscribers').html('');
        $('#channel-data__views').html('');
        $('#channel-data__comments').html('');
    },

    hidden() {
        $('#channel-data__logo').hide();
        $('#channel-data__title').html('');
        $('#channel-data__description').html('');
        $('#channel-data__videos').html('');
        $('#channel-data__lists').html('');
        $('#channel-data__subscribers').html('');
        $('#channel-data__views').html('');
        $('#channel-data__comments').html('');
    }
};

let listsList = {
    update(items) {
        $('#lists-list').show();

        let list = '';

        for (let key in items) {
            list = list + this.createItem(items[key]);
        }

        $('#lists-list').html(list);
    },

    createItem (item) {
        return `<div class="list-item" id="${item.id}" onClick="onSelectList(this)">${this.createLogo(item.snippet.thumbnails.medium.url)}<div class="list-item__text">${this.createTitle(item.snippet.title)}${this.createDescription(item.contentDetails.itemCount)}</div></div>`;
    },

    createLogo (src) {
        return `<img class="list-item__logo" src="${src}"/>`;
    },

    createTitle (title) {
        return `<h2 class="list-item__title">${title}</h2>`;
    },

    createDescription (videosCount) {
        return `<p class="list-item__description">${videosCount} видео</p>`;
    },

    hidden() {
        $('#lists-list').hide();
    }
};

let videosList = {
    update(items) {
        $('#videos-list').show();

        let list = '';

        for (let key in items) {
            list = list + this.createItem(items[key]);
        }

        $('#videos-list').html(list);
    },

    createItem (item) {
        return `<div class="list-item" id="${item.snippet.resourceId.videoId}" onClick="onSelectVideo(this)">${this.createPreview(item.snippet.resourceId.videoId)}<div class="list-item__text">${this.createTitle(item.snippet.title)}${this.createDescription(item.snippet.description)}</div></div>`;
    },

    createPreview (id) {
        return `<iframe width="150" height="100" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
    },

    createTitle (title) {
        return `<h2 class="list-item__title">${title}</h2>`;
    },

    createDescription (description) {
        return `<p class="list-item__description">${description}</p>`;
    },

    hidden() {
        $('#videos-list').hide();
    }
};

let video = {
    update(item) {
        $('#video').show();

        $('#video__view').attr('src', `https://www.youtube.com/embed/${item.id}`);
        $('#video__title').html(item.snippet.title);
        $('#video__description').html(item.snippet.description);
        $('#video__likes').html(`Нравится: ${item.statistics.likeCount}`);
        $('#video__dislikes').html(`Не нравится: ${item.statistics.dislikeCount}`);
        $('#video__views').html(`Просмотры: ${item.statistics.viewCount}`);
        $('#video__comments').html(`Коментарии: ${item.statistics.commentCount}`);
    },

    hidden () {
        $('#video').hide();
    }
};

let stateIcon = {
    ready() {
        $('#toolbar__status-icon').html('Готово');
    },

    waiting() {
        $('#toolbar__status-icon').html('Ожидание...');
    },

    error (code) {
        $('#toolbar__status-icon').html(`Ошибка ${code}`);
    }
};


/*
 ---On Clicks---
 */

function onSelectChannel () {
    selectChannel($('#toolbar__change-channel-input').val());
}

function onSelectList(e) {
    selectList(e.id);
}

function onSelectVideo(e) {
    selectVideo(e.id);
}



/*
---Send Request---
 */

function selectChannel (id) {
    channelData.hidden();
    listsList.hidden();
    videosList.hidden();
    video.hidden();
    stateIcon.waiting();

    request(getChanneldata, 'channels', {part: 'snippet,statistics', id});
    request(getLists, 'playlists', {part: 'snippet,contentDetails', channelId: id, maxResults: '25'});
}

function selectList (id) {
    videosList.hidden();
    video.hidden();
    stateIcon.waiting();

    request(getVideos, 'playlistItems', {playlistId: id, maxResults: '25', part: 'snippet,contentDetails'});
}

function selectVideo (id) {
    video.hidden();
    stateIcon.waiting();

    request(getVideoData, 'videos', {id, part: 'snippet,statistics'});
}

/*
---callbacks---
 */

let firstDataChannel = null;

function getChanneldata (data) {
    if (firstDataChannel === null) {
        firstDataChannel = data;
    }
    else {
        channelRequestSuccess(data, firstDataChannel);
        firstDataChannel = null;
    }
}

function getLists (data) {
    if (firstDataChannel === null) {
        firstDataChannel = data;
    }
    else {
        channelRequestSuccess(firstDataChannel, data);
        firstDataChannel = null;
    }
}

function channelRequestSuccess (dataChannel, dataLists) {
    if ('error' in dataChannel) {
        channelData.hidden();
        listsList.hidden();
        stateIcon.error(dataChannel.error.code);
        return;
    }

    if (dataChannel.items.length === 0) {
        channelData.notFound();
        listsList.hidden();
        stateIcon.ready();
        return;
    }

    if ('error' in dataLists) {
        channelData.hidden();
        listsList.hidden();
        stateIcon.error(dataLists.error.code);
        return;
    }

    channelData.update(dataChannel.items[0], dataLists.items.length);

    if (dataLists.items.length === 0) {
        listsList.hidden();
    }
    else {
        listsList.update(dataLists.items);
    }

    stateIcon.ready();
}

function getVideos (data) {
    if ('error' in data) {
        videosList.hidden();
        stateIcon.error(data.error.code);
        return;
    }

    videosList.update(data.items);
    stateIcon.ready();
}

function getVideoData (data) {
    if ('error' in data) {
        video.hidden();
        stateIcon.error(data.error.code);
        return;
    }

    video.update(data.items[0]);
    stateIcon.ready();
}


/*
 ---Request---
 */

function request(callback, method, params) {
    $.ajax({
        url: createUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: callback,
        error: (jqXHR) => {
            stateIcon.error(`соединения ${jqXHR.status}`);
        }
    });
}

function createUrl (method, params) {
    params.key = 'AIzaSyDGuR1S0WDDDzKNXdTP18sTUmxIoZfmN5c';
    return `https://www.googleapis.com/youtube/v3/${method}?${$.param(params)}`;
}