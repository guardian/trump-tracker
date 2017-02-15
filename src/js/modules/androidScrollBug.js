module.exports =  {
    init: function() {
        if(window.GuardianJSInterface) {
            this.bindings();
        }
    },

    bindings: function() {
        document.querySelector('.trump-tracker__data-points').addEventListener('touchstart', function() {
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        });
        document.querySelector('.trump-tracker__data-points').addEventListener('touchend', function() {
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        });
    },
};