var $ = require('../vendor/jquery.js');
var handlebars = require('handlebars');

var share = require('../modules/share.js');
var animateStats = require('../modules/animateStats.js');
var scrollTo = require('../modules/scrollTo.js');
var lastUpdated = require('../modules/lastUpdated.js');
var androidScrollBug = require('../modules/androidScrollBug.js');

var dayHtml = require('../templates/days.html');
var statsHtml = require('../templates/stats.html');
var membershipHtml = require('../templates/membership.html');
var relatedHtml = require('../templates/related.html');

var data;

module.exports =  {
    init: function() {
        this.initHandlebars();
        this.getJson();
    },

    initHandlebars: function() {
        handlebars.registerHelper('if_eq', function(a, b, opts) {
            if(a == b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        });

        handlebars.registerHelper('getImage', function(url, size) {
            var crop = url.split('?crop=')[1];
            var url = url.replace('gutools.co.uk', 'guim.co.uk');
                url = url.replace('http://', 'https://');
                url = url.replace('images/', '');
                url = url.split('?')[0];
                url = url + '/' + crop + '/' + size + '.jpg';

            return '<img class="trump-tracker__day-image" src="' + url + '"/>'
        });

        handlebars.registerHelper('assetPath', function() {
            return '@@assetPath@@'
        });
    },

    getJson: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata/1TTV-g36nUE8uxVb882sC2lCeR8Yt8SGjIbJtN12yF0E.json', function(response) {
            data = response.sheets;
            data.completeDays = 0;
            for (var i in data.days) {
                if (data.days[i].copy !== '') {
                    data.completeDays = parseInt(i) + 1;
                }
            }
            console.log(data);
            this.injectHtml();
        }.bind(this));
    },

    injectHtml: function() {
        this.addDays();
        this.addStats();
        this.addSidebar();
        this.addRelated();
    },

    addDays: function() {
        var dayTemplate = handlebars.compile(dayHtml);
        console.log(data.completeDays);
        var compiledHtml = dayTemplate({days: this.cleanDays(data.days), completeDays: data.completeDays});

        $('.trump-tracker__days').html(compiledHtml);
        $('.trump-tracker__day:nth-of-type(3)').after(membershipHtml);

        share.setDayLinks();
        $('.trump-tracker__loading').addClass('has-loaded');

        setTimeout(function() {
            scrollTo.init()
        }, 500);
    },

    addStats: function() {
        var statsTemplate = handlebars.compile(statsHtml);
        var compiledHtml = statsTemplate(this.sortData(data.data));

        $('.trump-tracker__stats .gs-container').html(compiledHtml);
        androidScrollBug.init();
        // animateStats.init();
    },

    addSidebar: function() {
        var sortedData = this.sortData(data.data);
        var date = lastUpdated.convert(Date.parse(sortedData.lastUpdated));
        $('.trump-tracker__updated').text('Last Updated ' + date);
    },

    addRelated: function() {
        var relatedTemplate = handlebars.compile(relatedHtml);
        var compiledHtml = relatedTemplate({related: data.related});

        $('.trump-tracker__related').html(compiledHtml);
    },

    sortData: function(data) {
        var furniture = {}

        for (var i = 0; i < data.length; i++) {
            furniture[data[i].option] = data[i].value
        }

        return furniture;
    },

    cleanDays: function(days) {
        for (var i = 0; i < days.length; i++) {
            if (days[i].type === 'embed') {
                days[i].media = days[i].media.replace('src="//', 'src="https://');
            }
        }

        return days.reverse();
    }
};
