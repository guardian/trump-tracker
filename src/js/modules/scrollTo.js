var $ = require('../vendor/jquery.js');

module.exports =  {
    init: function() {
        if (this.getTarget()) {
            this.scrollToDay(this.getTarget());
        }
    },

    scrollToDay: function(target) {
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 400);
    },

    getTarget: function() {
        return window.location.hash;
    }
};