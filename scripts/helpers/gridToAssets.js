var request = require('sync-request');
var md5 = require('md5');
var imageSpecs = require('../image.json');
var keys = require('../../keys.json');

function getUrl(sourceUrl, size, retina = false, color) {
    var blend64Color = (color === 'yellow' ? 'ZmZhODAw' : 'M2RkNWRm');
    var url = sourceUrl + '?w=' + size + '&q=40' + (retina ? '&dpr=2' : '') +  '&mono=fff&blend64=' + blend64Color + '&bm=multiply&shad=50' + '&usm=12&fit=max';
        url = 'https://i.guim.co.uk/img/media' + url + '&s=' + md5(keys.imgixToken + url);
    return url;
}

function getUrls(sourceUrl, sizes, color) {
    var urls = {};
    for (var i = 0; i < sizes.length; i++) {
        urls[i] = {
            "url": getUrl(sourceUrl, sizes[i], false, color),
            "retinaUrl" : getUrl(sourceUrl, sizes[i], true, color),
            "minSize": ((sizes.length - 1 == i) ? '0' : parseInt(sizes[i + 1]) + 60)
        }
    }
    return urls;
}

module.exports = function gridToAssets(gridUrl, type, color) {
    var gridUrl = gridUrl.replace('https://media', 'https://api.media');

    var data = request('GET', gridUrl,{ headers: { 'X-Gu-Media-Key' : keys.gridApiKey}});
        data = JSON.parse(data.getBody('utf8')).data;

    var crop = gridUrl.split('?crop=')[1].split('_');

    for (var i = 0; i < data.exports.length; i++) {
        if (data.exports[i].specification.bounds.x == crop[0] &&
            data.exports[i].specification.bounds.y == crop[1] &&
            data.exports[i].specification.bounds.width == crop[2] &&
            data.exports[i].specification.bounds.height == crop[3]) {
            var sourceUrl = data.exports[i].master.file.replace('http://media.guim.co.uk', '');
        }
    }

    return {
        'sources': getUrls(sourceUrl, imageSpecs[type], color),
        'fallback': getUrl(sourceUrl, 300, false, color),
        'title': data.metadata.title,
        'credit': data.metadata.credit,
        'byline': data.metadata.byline
    }
};
