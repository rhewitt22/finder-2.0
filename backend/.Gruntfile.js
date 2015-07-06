module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'api/**/*.js', 'test/**/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'mochaTest']
    }
  });

  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);

};