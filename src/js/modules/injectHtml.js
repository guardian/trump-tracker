var $ = require('../vendor/jquery.js');
var share = require('../modules/share.js');
var animateStats = require('../modules/animateStats.js');
var scrollTo = require('../modules/scrollTo.js');
var handlebars = require('handlebars');
var lastUpdated = require('../modules/lastUpdated.js');
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
            console.log(url);
            // https://media.gutools.co.uk/images/f8031f38c8c892ebe716ef3bbf6132127ddb0ce7?crop=0_19_4602_2764

            var url = url.replace('gutools.co.uk', 'guim.co.uk');
                url = url.replace('http://', 'https://');
                console.log(url);
            // https://media.guim.co.uk/images/f8031f38c8c892ebe716ef3bbf6132127ddb0ce7?crop=0_19_4602_2764
                url = url.replace('images/', '');
            var crop = url.split('?crop=')[1];
                url = url.split('?')[0];
                console.log(url);
                url = url + '/' + crop + '/' + size + '.jpg';

            return '<img class="trump-tracker__day-image" src="' + url + '"/>'
            // https://media.guim.co.uk/486fc1899aa85cf048fc1a2fe031f4862d2c4bc5/1176_1972_2262_1358/500.jpg
        });

        handlebars.registerHelper('assetPath', function() {
            return '@@assetPath@@'
        });
    },

    getJson: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata-test/1TTV-g36nUE8uxVb882sC2lCeR8Yt8SGjIbJtN12yF0E.json', function(response) {
            data = response.sheets;
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
        var compiledHtml = dayTemplate({days : data.days.reverse()});

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
        animateStats.init();
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
    }
};
