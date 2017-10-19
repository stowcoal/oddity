module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      dev: {
        script: './bin/www'
      },
      options: {
        env: {
          PORT: '3001'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app.js', 'public/javascripts/**/*.js', 'routes/**/*.js', 'config/**/*.js', 'controllers/**/*.js', 'models/**/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'nodemon:dev']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);
};
