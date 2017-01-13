var fs = require('fs-extra');
var handlebars = require('handlebars');
var partialLoader = require('partials-loader');
var browserify = require('browserify');
var stringify = require('stringify');
var sass = require('node-sass');
var deasync = require('deasync');

module.exports = {
    js: function(path, fileName, absolutePath) {
        fs.removeSync(path + '/' + fileName + '.js');

        var isDone = false;

        browserify('./src/js/' + fileName + '.js').transform(stringify, {
            appliesTo: { includeExtensions: ['.hjs', '.html', '.whatever'] }
        }).bundle(function(err, buf) {
            if (err) {
                console.log(err);
            }
            fs.writeFileSync(path + '/' + fileName + '.js', buf.toString().replace(/@@assetPath@@/g, absolutePath));
            isDone = true;
            console.log('updated js!');
        });

        deasync.loopWhile(function() {
            return !isDone;
        });
    },

    css: function(path, absolutePath) {
        fs.removeSync(path + '/main.css');

        var css = sass.renderSync({
            file: 'src/sass/main.scss'
        }).css.toString('utf8');

        fs.writeFileSync(path + '/main.css', css.replace(/@@assetPath@@/g, absolutePath));
        console.log('updated css!');
    },

    html: function(path, absolutePath) {
        fs.removeSync(path + '/main.html');

        handlebars.registerHelper('if_eq', function(a, b, opts) {
            if(a == b) // Or === depending on your needs
                return opts.fn(this);
            else
                return opts.inverse(this);
        });

        var html = fs.readFileSync('src/templates/main.html', 'utf8');
        var template = handlebars.compile(html);

        partialLoader.handlebars({
            template_engine_reference: handlebars, 
            template_root_directories: './src/templates/',
            partials_directory_names: ['partials', 'helpers', 'icons', 'drawn'],
            template_extensions: ['html', 'svg']
        });

        fs.writeFileSync(path + '/main.html', template().replace(/@@assetPath@@/g, absolutePath));
        console.log('updated html!');
    },

    preview: function(path, isDeploy, assetPath) {
        var guardianHtml = fs.readFileSync('./scripts/immersive.html', 'utf8');
        var guardianTemplate = handlebars.compile(guardianHtml);

        var compiled = guardianTemplate({
            'html': fs.readFileSync(path + '/main.html'),
            'js': fs.readFileSync(path + '/main.js')
        });

        if (isDeploy) {
            var re = new RegExp(assetPath,'g');
            compiled = compiled.replace(re, 'assets');
        }

        fs.writeFileSync(path + '/index.html', compiled);

        console.log('built page preview');
    }
} 