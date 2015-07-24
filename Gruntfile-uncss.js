module.exports = function(grunt) {
  grunt.initConfig({
    // Remove unused CSS across multiple files, compressing the final output
    uncss: {
    dist: {
    options : {
                htmlroot: 'dist',
    },
      files: [
//        { src: 'dist/**/*.html', dest: 'dist/css/compiled.min.css'}
        { src: 'dist/*.html', dest: 'dist/css/compiled.min.css'}
      ]
      },
      options: {
        compress:true
      }
    },
	})
  // Load the plugins
  grunt.loadNpmTasks('grunt-uncss');
  // Default tasks.
  grunt.registerTask('default', ['uncss']);
};
