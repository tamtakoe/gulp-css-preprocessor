var through        = require('through2');
var accord         = require('accord');
var gutil          = require('gulp-util');
var path           = require('path');
var applySourceMap = require('vinyl-sourcemaps-apply');
var _              = require('lodash');

var PLUGIN_NAME    = 'gulp-css-preprocessor';
var less           = accord.load('less');
var stylus         = accord.load('stylus');
var scss           = accord.load('scss');
var extMap         = {
    '.less': {name: 'less',   plugin: less},
    '.styl': {name: 'stylus', plugin: stylus},
    '.scss': {name: 'scss',   plugin: scss},
    '.sass': {name: 'sass',   plugin: scss, defaults: {indentedSyntax: true}}
};

module.exports = function (options) {
    'use strict';

    options = _.assign({}, options);

    return through.obj(function (file, enc, callback) {
        var ext = path.extname(file.path);

        if (file.isStream()) {
            return callback(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }
        if (file.isNull()) {
            return callback(null, file);
        }
        if (!extMap[ext]) {
            return callback(null, file);
        }
        if (file.sourceMap) {
            options.sourcemap = true;
        }

        var pluginOptions = _.defaults(options[extMap[ext].name] || {}, extMap[ext].defaults);
        pluginOptions.filename = file.path;

        extMap[ext].plugin.render(file.contents.toString('utf8'), pluginOptions)
            .then(function(res) {
                if (res.result !== undefined) {
                    file.path = gutil.replaceExtension(file.path, '.css');
                    file.contents = new Buffer(res.result);

                    if (res.sourcemap) {
                        res.sourcemap.file = file.relative;
                        res.sourcemap.sources = res.sourcemap.sources.map(function (source) {
                            return path.relative(file.base, source);
                        });

                        applySourceMap(file, res.sourcemap);
                    }
                }
                return callback(null, file);
            })
            .catch(function (err) {
                delete err.input;
                return callback(new gutil.PluginError(PLUGIN_NAME, err));
            });
    });
};