// dependancies
var handlebars = require('handlebars');
var fs = require('fs-extra');
var cmd = require('node-cmd');
var deploy = require('./deploy.js');
var config = require('../scripts/config.json');
var gridToAssets = require('../scripts/helpers/gridToAssets.js');
var assets = require('../scripts/helpers/assets.js');
var screenshot = require('../scripts/helpers/screenshot.js');

var specs =  {
    'deploy': process.argv.slice(2)[0] == 'true' ? true : false,
    'content': process.argv.slice(2)[1],
    'build': process.argv.slice(2)[2] ? process.argv.slice(2)[2] : 'preview',
    'modified': process.argv.slice(2)[3] ? process.argv.slice(2)[3] : 'none'
};

var path = '.build/';
var version = 'v/' + Date.now();
var assetPath = specs.deploy === false ? 'http://localhost:' + config.local.port : config.remote.url + '/' + config.remote.path + '/' + version;

fs.mkdirsSync(path);

if (specs.modified === 'html') {
    assets.html(path, assetPath);
} else if (specs.modified === 'js') {
    assets.js(path, 'main');
} else if (specs.modified === 'css') {
    assets.css(path, assetPath);
} else {
    assets.html(path, assetPath);
    assets.css(path, assetPath);
    assets.js(path, 'main');
}

if (specs.deploy === false) {
    assets.preview(path, specs.deploy, assetPath);
}

fs.copySync('src/assets', path + '/assets');

if (specs.deploy) {
    fs.emptyDirSync('.deploy');
    fs.copySync(path, '.deploy/' + version);
    fs.writeFileSync('.deploy/' + build, version);
    deploy(playlist.name);
}
