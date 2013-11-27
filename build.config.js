/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

  compile_dir: 'dist',

  app_files: {
    js: [ 'src/momentjs.js', 'src/**/*.js', '!src/**/*.spec.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    jshint: [ 'src/**/*.js', '!src/**/*.spec.js' ]
  }

};
