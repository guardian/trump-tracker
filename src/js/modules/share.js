var $ = require('../vendor/jquery.js');

var pageUrl = window.location.href;
var title = 'The first 100 Days of Trump';

module.exports =  {
    init: function() {
        this.setLinks();
    },

    setLinks: function() {
        $('.trump-tracker-header__share-link--twitter').attr('href', this.getTwitterLink());
        $('.trump-tracker-header__share-link--facebook').attr('href', this.getFacebookLink());
        $('.trump-tracker-header__share-link--email').attr('href', this.getEmailLink());
    },

    getTwitterLink: function() {
        return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + 
                '&url=' + encodeURIComponent(pageUrl + '?CMP=share_btn_tw');
    },

    getFacebookLink: function() {
        return 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(pageUrl + '?CMP=share_btn_fb');
    },

    getEmailLink: function() {
        return 'mailto:?subject=' + encodeURIComponent(title) +
                '&body=' + encodeURIComponent(pageUrl + '?CMP=share_btn_link');
    }
};