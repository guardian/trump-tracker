var $ = require('../vendor/jquery.js');
var countUp = require('countup.js');

var options = {
    useEasing: true,
    useGrouping: false
}

module.exports =  {
    init: function() {
        this.animateNumbers();
    },

    animateNumbers: function() {
        this.animateNumber('trump-tweets');
        this.animateNumber('trump-obama');
        this.animateNumber('trump-wall');
        this.animateNumber('trump-white-house');
    },

    animateNumber: function(id) {
        var number = $('#' + id).text();
        var countNumber = new countUp(id, 0, number, 0, 3, options);
        countNumber.start();
    }
};