var webshot = require('webshot');
var static = require('node-static');
var fs = require('fs-extra');

module.exports = function screenshot(content, numOfPanels, callback) {
    var path = './.build/' + content + '/';
    var completed = 0;
    fs.mkdirsSync(path);

    console.log('generating screenshots...');

    var file = new static.Server(path, {
        'cache': 0,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    });

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(8090);

    for (i = 0; i < numOfPanels; i++) {
        webshot('http://localhost:8090/index.html', path + 'social/panel--' + i + '.png', {
            captureSelector: '.explainer-panel--' + i
        }, function(err) {
            if (err) {
                console.log(err);
            }

            completed++;
            console.log('rendered screenshot number ' + completed);
            if (completed === numOfPanels) {
                console.log('screenshots completed');
                callback();
            }
        });
    }
};