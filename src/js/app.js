var injectHtml = require('./modules/injectHtml.js');
var share = require('./modules/share.js');
var androidScrollBug = require('./modules/androidScrollBug.js');

// setTimeout(function() {
    injectHtml.init()
// }, 6000);
share.init();
androidScrollBug.init();