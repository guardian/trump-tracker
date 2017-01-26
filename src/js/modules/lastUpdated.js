var $ = require('../vendor/jquery.js');

module.exports =  {
    convert: function(timestamp) {
        var now = new Date(),
            then = new Date(timestamp),
            delta = parseInt((now.getTime() - timestamp) / 1000, 10);

        if (delta < 0) {
            return false;

        } else if (delta < 55) {
            return delta + ' second' + (delta > 1 ? 's': '') + ' ago';

        } else if (delta < (55 * 60)) {
            minutes = Math.round(delta / 60, 10);
            return minutes + ' minute' + (minutes > 1 ? 's': '') + ' ago';

        } else if (this.isToday(then)) {
            hours = Math.round(delta / 3600);
            return hours + ' hour' + (hours > 1 ? 's': '') + ' ago';

        } else if (this.isYesterday(then)) {
            return 'yesterday'

        } else if (delta < 5 * 24 * 60 * 60) { // less than five days
            return 'on ' + this.getDay(then);

        } else {
            return this.getDay(then) + ' ' + then.getDate() + ' ' + this.getMonth(then) + ' ' + then.getFullYear();
        }
    },

    isToday: function(date) {
        var now = new Date();
        return date.toDateString() === now.toDateString() ? true : false;
    },

    isYesterday: function(date) {
        var now = new Date();
        var yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString() ? true : false;
    },

    getDay: function(then) {
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekDays[then.getDay()];
    },

    getMonth: function(then) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[then.getMonth()];
    }
};