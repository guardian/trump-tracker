var $ = require('../vendor/jquery.js');

module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $('.trump-tracker__data-points').bind('touchstart', function() {
            this.onTouchStart();
        }.bind(this));
        $('.trump-tracker__data-points').bind('touchend', function() {
            this.onTouchEnd();
        }.bind(this));
    },

    onTouchStart: function() {
        if(window.GuardianJSInterface) {
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        }
    },

    onTouchEnd: function() {
        if(window.GuardianJSInterface) {
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        }
    }
};