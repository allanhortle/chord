var webpackConfig = require('./webpack.config.js');

var CORE = {
    MAIN: [
        './node_modules/immutable/dist/immutable.min.js',
        './node_modules/react/dist/react-with-addons.min.js',
        './node_modules/react-dom/dist/react-dom.min.js'
    ],
    POLYFILL: [
        './node_modules/babel-core/browser-polyfill.min.js'
    ]
}

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({

        // JS Tasks
        webpack: {
            development: webpackConfig.development,
            production: webpackConfig.production
        },

        concat: {
            options: {
                stripBanners: {
                    block: true
                }
            },
            production: {
                files: {
                    './src/chord/public/core.js':        CORE.MAIN,
                    './src/chord/public/core-compat.js': CORE.MAIN.concat(CORE.POLYFILL)
                }
            }
        },

        // Server Tasks
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watchedExtensions: ['js', 'json'],
                    ignore: ['node_modules/**', 'client/**', 'public/**', 'Gruntfile.js'],
                    env: {
                        PORT: process.env['CHORD_PORT'] || 3000,
                        BABEL_ENV: 'development'
                    },
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                    }
                }
            }
        },

        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            development: {
                singleRun: false,
                autoWatch: true,
                logLevel: 'INFO'
            },
            single: {
                singleRun: true,
                logLevel: 'ERROR'
            }
        }
    });

    grunt.registerTask('default',           ['nodemon']);
    grunt.registerTask('build',             ['concat', 'webpack:production']);
    grunt.registerTask('build:development', ['concat', 'webpack:development']);
    grunt.registerTask('test',              ['karma:single']);
    grunt.registerTask('testing',           ['karma:development']);

};
