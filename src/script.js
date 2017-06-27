$(document).ready(() => {
    selectChannel('UCFjOsuEC53SL4GWpeO7b7Ww');
});

/*
---Обновление интерфейса---
 */

let channelDate = {
    update(date, listsCount)  {
        $('#channelData__logo').show();
        $('#channelData__logo').attr('src', date.snippet.thumbnails.high.url);
        $('#channelData__title').html(date.snippet.title);
        $('#channelData__description').html(date.snippet.description);

        $('#channelData__videos').html(`Видео: ${date.statistics.videoCount}`);
        $('#channelData__lists').html(`Плейлисты: ${listsCount}`);
        $('#channelData__subscribers').html(`Подпищики: ${date.statistics.subscriberCount}`);
        $('#channelData__views').html(`Просмотры: ${date.statistics.viewCount}`);
        $('#channelData__comments').html(`Коментарии: ${date.statistics.commentCount}`);
    },

    notFound() {
        $('#channelData__logo').hide();
        $('#channelData__title').html('Канал не найден!');
        $('#channelData__description').html('');
        $('#channelData__videos').html('');
        $('#channelData__lists').html('');
        $('#channelData__subscribers').html('');
        $('#channelData__views').html('');
        $('#channelData__comments').html('');
    },

    hidden() {
        $('#channelData__logo').hide();
        $('#channelData__title').html('');
        $('#channelData__description').html('');
        $('#channelData__videos').html('');
        $('#channelData__lists').html('');
        $('#channelData__subscribers').html('');
        $('#channelData__views').html('');
        $('#channelData__comments').html('');
    }
};

let listsList = {
    update(items) {
        $('#listsList').show();

        let list = '';

        for (let key in items) {
            list = list + this.createItem(items[key]);
        }

        $('#listsList').html(list);
    },

    createItem (item) {
        return `<div class="listItem" id="${item.id}" onClick="onSelectList(this)">${this.createLogo(item.snippet.thumbnails.medium.url)}<div class="listItem__text">${this.createTitle(item.snippet.title)}${this.createDescription(item.contentDetails.itemCount)}</div></div>`;
    },

    createLogo (src) {
        return `<img class="listItem__logo" src="${src}"/>`;
    },

    createTitle (title) {
        return `<h2 class="listItem__title">${title}</h2>`;
    },

    createDescription (videosCount) {
        return `<p class="listItem__description">${videosCount} видео</p>`;
    },

    hidden() {
        $('#listsList').hide();
    }
};

let videosList = {
    update(items) {
        $('#videosList').show();

        let list = '';

        for (let key in items) {
            list = list + this.createItem(items[key]);
        }

        $('#videosList').html(list);
    },

    createItem (item) {
        return `<div class="listItem" id="${item.snippet.resourceId.videoId}" onClick="onSelectVideo(this)">${this.createPreview(item.snippet.resourceId.videoId)}<div class="listItem__text">${this.createTitle(item.snippet.title)}${this.createDescription(item.snippet.description)}</div></div>`;
    },

    createPreview (id) {
        return `<iframe width="150" height="100" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
    },

    createTitle (title) {
        return `<h2 class="listItem__title">${title}</h2>`;
    },

    createDescription (description) {
        return `<p class="listItem__description">${description}</p>`;
    },

    hidden() {
        $('#videosList').hide();
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
        $('#toolbar__statusIcon').html('Готово');
    },

    waiting() {
        $('#toolbar__statusIcon').html('Ожидание...');
    },

    error (code) {
        $('#toolbar__statusIcon').html(`Ошибка ${code}`);
    }
};


/*
 ---On Clicks---
 */

function onSelectChannel () {
    selectChannel($('#toolbar__changeChannelInput').val());
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
    channelDate.hidden();
    listsList.hidden();
    videosList.hidden();
    video.hidden();
    stateIcon.waiting();

    request(getChannelDate, 'channels', {part: 'snippet,statistics', id});
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

    request(getVideoDate, 'videos', {id, part: 'snippet,statistics'});
}

/*
---callbacks---
 */

let firstDateChannel = null;

function getChannelDate (date) {
    if (firstDateChannel === null) {
        firstDateChannel = date;
    }
    else {
        channelRequestSuccess(date, firstDateChannel);
        firstDateChannel = null;
    }
}

function getLists (date) {
    if (firstDateChannel === null) {
        firstDateChannel = date;
    }
    else {
        channelRequestSuccess(firstDateChannel, date);
        firstDateChannel = null;
    }
}

function channelRequestSuccess (dateChannel, dateLists) {
    if ('error' in dateChannel) {
        channelDate.hidden();
        listsList.hidden();
        stateIcon.error(dateChannel.error.code);
        return;
    }

    if (dateChannel.items.length === 0) {
        channelDate.notFound();
        listsList.hidden();
        stateIcon.ready();
        return;
    }

    if ('error' in dateLists) {
        channelDate.hidden();
        listsList.hidden();
        stateIcon.error(dateLists.error.code);
        return;
    }

    channelDate.update(dateChannel.items[0], dateLists.items.length);

    if (dateLists.items.length === 0) {
        listsList.hidden();
    }
    else {
        listsList.update(dateLists.items);
    }

    stateIcon.ready();
}

function getVideos (date) {
    if ('error' in date) {
        videosList.hidden();
        stateIcon.error(date.error.code);
        return;
    }

    videosList.update(date.items);
    stateIcon.ready();
}

function getVideoDate (date) {
    if ('error' in date) {
        video.hidden();
        stateIcon.error(date.error.code);
        return;
    }

    video.update(date.items[0]);
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