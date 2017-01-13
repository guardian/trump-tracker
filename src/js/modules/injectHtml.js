var $ = require('../vendor/jquery.js');
var share = require('../modules/share.js');
var handlebars = require('handlebars');
var dayHtml = require('../templates/days.html');
var statsHtml = require('../templates/stats.html');

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

        handlebars.registerHelper('getImage', function(url) {
            var dataUrl = url.split(' ')[0];
            var dataRatioRaw = url.split('cropRatio=')[1].split('&size')[0];
            var dataRatioSizes = dataRatioRaw.split(',');
            var dataRatio = Number(dataRatioSizes[1]) / Number(dataRatioSizes[0]);
            var dataSizes = url.split('&size=')[1];

            var basePath = dataUrl.replace('http://', 'https://');

            return '<img class="trump-tracker__day-image" src="' + basePath + '/500.jpg"/>'
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
    },

    addDays: function() {
        var dayTemplate = handlebars.compile(dayHtml);
        var compiledHtml = dayTemplate({days : data.days.reverse()});

        $('.trump-tracker__days').html(compiledHtml);

        share.setDayLinks();
        $('.trump-tracker__loading').addClass('has-loaded');
    },

    addStats: function() {
        var statsTemplate = handlebars.compile(statsHtml);
        var compiledHtml = statsTemplate(this.sortData(data.data));

        $('.trump-tracker__stats .gs-container').html(compiledHtml);
    },

    sortData: function(data) {
        var furniture = {}

        for (var i = 0; i < data.length; i++) {
            furniture[data[i].option] = data[i].value
        }

        return furniture;
    }
};
