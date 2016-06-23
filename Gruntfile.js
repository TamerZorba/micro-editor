module.exports = function (grunt) {
  grunt.registerTask('speak', function () {
    console.log('hello speak')
  })
  grunt.initConfig({
    concat: {
      js: {
        src: ['src/js/main.js', 'src/js/plugins/**/*.js', "!src/js/plugins/_temp.js"],
        dest: 'dest/micro-editor.js',
      },
      css: {
        src: ['src/css/main.css', 'src/css/animation.css'],
        dest: 'dest/style.css',
      },
    },
    uglify: {
      js: {
        files: {
          'dest/micro-editor.min.js': ['src/js/**/*.js']
        }
      }
    },
    cssmin: {
      css: {
        files: {
          'dest/style.min.css': ['src/css/main.css', 'src/css/animation.css']
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat:js', 'uglify:js']
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['concat:css', 'cssmin:css']
      },
    },
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch'])
}
