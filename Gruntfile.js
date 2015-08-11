'use strict';
 
module.exports = function(grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('jit-grunt')(grunt);

    grunt.loadNpmTasks('grunt-aws-s3');

    var path = require('path')
 
    grunt.initConfig({
        app: {
            app: 'app',
            dist: 'dist',
            baseurl: ''
        },
        watch: {
//            sass: {
//                files: ['<%= app.app %>/scss/**/*.{scss,sass}'],
//                tasks: ['sass:server', 'autoprefixer']
//            },
            scripts: {
                files: ['<%= app.app %>/js/**/*.{js}'],
                tasks: ['uglify']
            },
            jekyll: {
                options: {
                    bundleExec: true,
                },
                files: [
                    '<%= app.app %>/**/*.{html,yml,md,mkd,markdown}'
                ],
                tasks: ['jekyll:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.{html,yml,md,mkd,markdown}',
                    '.tmp/<%= app.baseurl %>/css/*.css',
                    '.tmp/<%= app.baseurl %>/js/*.js',
                    '<%= app.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:9000/<%= app.baseurl %>'
                    },
                    base: '.jekyll/<%= app.baseurl %>/.tmp'
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://localhost:9000/<%= app.baseurl %>'
                    },
                    base: [
                        '<%= app.dist %>',
                        '.tmp'
                    ]
                }
            }
        },
        clean: {
            server: [
                '.jekyll',
                '.tmp'
            ],
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/*',
                        '!<%= app.dist %>/.git*'
                    ]
                }]
            }
        },
        jekyll: {
            options: {
                bundleExec: true,
                config: '_config.yml,_config.build.yml',
                src: '<%= app.app %>'
            },
            dist: {
                options: {
                    bundleExec: true,
                    dest: '<%= app.dist %>/<%= app.baseurl %>',
                }
            },
            server: {
                options: {
                    bundleExec: true,
                    config: '_config.yml',
                    dest: '.jekyll/<%= app.baseurl %>/.tmp'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>',
                    src: '**/*.html',
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }]
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                report: 'min'
            },
            dist: {
                files: {
                    '.tmp/<%= app.baseurl %>/js/scripts.js':
                    ['<%= app.app %>/js/jquery-1.11.0.js',
                    '<%= app.app %>/js/bootstrap.js',
                    '<%= app.app %>/js/jquery.easing.min.js',
                    '<%= app.app %>/js/classie.js',
                    '<%= app.app %>/js/cbpAnimatedHeader.js',
                    '<%= app.app %>/js/jqBootstrapValidation.js',
                    '<%= app.app %>/js/contact_me_static.js',
                    '<%= app.app %>/js/freelancer.js',]
//    '<%= app.app %>/js/*.js']
                }
            }
        },
        sass: {
            server: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.app %>/_assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '.tmp/<%= app.baseurl %>/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.app %>/_assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/css',
                    ext: '.css'
                }]
            }
        },
        uncss: {
            options: {
                htmlroot: '<%= app.dist %>',
                report: 'min'
            },
            dist: {
                src: '<%= app.dist %>/<%= app.baseurl %>/**/*.html',
//                src: 'dist/index.html',//'<%= app.dist %>/*.html',
                dest: '.tmp/<%= app.baseurl %>/css/blog.css'
//                dest: 'dist/css/blog.css'
//                  files: { 'dist/css/blog.css' : ['dist/index.html'] }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/<%= app.baseurl %>/css',
                    src: '**/*.css',
                    dest: '.tmp/<%= app.baseurl %>/css'
                }]
            }
        },
        critical: {
            dist: {
                options: {
                    base: './',
                    css: [
//                        '.tmp/<%= app.baseurl %>/css/blog.css'
                        '.tmp/<%= app.baseurl %>/css/style.css',
                        '.tmp/<%= app.baseurl %>/css/font-awesome/css/font-awesome.min.css'
                    ],
                    minify: true,
                    width: 320,
                    height: 480
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/<%= app.baseurl %>',
                    src: ['**/*.html'],
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    check: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/<%= app.baseurl %>/css',
                    src: ['*.css'],
                    dest: '.tmp/<%= app.baseurl %>/<%= app.baseurl %>/css'
                }]
            }
        },
        imagemin: {
            options: {
                progressive: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/img',
                    src: '**/*.{jpg,jpeg,png,gif}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/img',
                    src: '**/*.svg',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/img'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.tmp/<%= app.baseurl %>',
                    src: [
                        'css/**/*',
                        'js/**/*'
                    ],
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }],
            },
            dist_fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>',
                    src: [
                        'css/font-awesome/fonts/*',
                    ],
                    dest: '<%= app.dist %>/<%= app.baseurl %>/fonts'
                }],
            },
            dist_tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: '.tmp/<%= app.baseurl %>',
                    src: [
                        'css/**/*',
                        '**/*.html',
                        'js/**/*'
                    ],
                    cwd: '<%= app.dist %>/<%= app.baseurl %>'
                }]
            }
        },
        processhtml: {
          dist:{
            options: {
              process: true
            },
            files: [
            {
              expand: true,
              cwd: '.tmp/',
              src: ['*.html'],
              dest: '.tmp/'
            },
            ],
          },
          dist2:{
            options: {
              process: true
            },
            files: [
            {
              expand: true,
              cwd: '.tmp/',
              src: ['*.html'],
              dest: 'dist/'
            },
            ],
          }
        },
        aws: grunt.file.readJSON('aws-keys.json'), // Read the file 
 
         compress: {
          dist: {
            options: {
              mode: 'gzip',
              pretty: true
            },
            files: [
            // can't figure out a way to simply get it to add .gz to each file it gzips
            // ext: options evidently fail for 'multiple' extensions foo.1.10.js, e.g.
                {expand: true, cwd:  "<%= app.dist %>", src: ['**/*.css' ], dest: "<%= app.dist %>_gz"},
                {expand: true, cwd:  "<%= app.dist %>", src: ['**/*.js'  ], dest: "<%= app.dist %>_gz"},
                {expand: true, cwd:  "<%= app.dist %>", src: ['**/*.html'], dest: "<%= app.dist %>_gz"},
                {expand: true, cwd:  "<%= app.dist %>", src: ['**/*.svg'], dest: "<%= app.dist %>_gz"},
            ]
          },
        },
    
        aws_s3: {
          options: {
            accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables 
            secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables 
            region: 'us-west-2', //s3.amazonaws.com
            uploadConcurrency: 5, // 5 simultaneous uploads 
            downloadConcurrency: 5, // 5 simultaneous downloads 
            excludeFromGzip: ['*.png', '*.jpg', '*.jpeg']
          },
          production: {
            options: {
              bucket: 'freeroamingsolutions.com',
              params: {
                    CacheControl: 'public,max-age=144000000', // 40 hours (1000 * 60 * 60* 40)
              },
              mime: {
                '<%= app.dist %>/LICENCE': 'text/plain'
              }
            },
            files: [
              {expand: true, cwd: '<%= app.dist %>', src: ['**'], dest: '.'},
            ]
          },
          productionGZipped: {
            options: {
                bucket: 'freeroamingsolutions.com',
                params: {
                    ContentEncoding: 'gzip',
                    CacheControl: 'public,max-age=120000', // 2 minutes (1000 * 60 * 2)
                }
            },
            files: [
              {
                expand: true,
                cwd: '<%= app.dist %>_gz',
                src: "**/*.css",
                dest: '.',
                params: {
                    ContentType: 'text/css',
                    CacheControl: 'public,max-age=144000000', // 40 hours (1000 * 60 * 60* 40)
 }
              },
              {
                expand: true,
                cwd: '<%= app.dist %>_gz',
                src: "**/*.js",
                dest: '.',
                params: {
                    ContentType: 'text/javascript',
                    CacheControl: 'public,max-age=144000000', // 40 hours (1000 * 60 * 60* 40)
 }
              },
              {
                expand: true,
                cwd: '<%= app.dist %>_gz',
                src: "**/*.html",
                dest: '.',
                params: { ContentType: 'text/html'}
              },
              {
                expand: true,
                cwd: '<%= app.dist %>_gz',
                src: "**/*.svg",
                dest: '.',
                params: { ContentType: 'image/svg+xml'}
              }
            ]
          },
          clean_production: {
            options: {
              bucket: 'freeroamingsolutions.com',
              debug: true // Doesn't actually delete but shows log 
            },
            files: [
              {dest: '.', action: 'delete'},
              //{dest: 'assets/', exclude: "**/*.tgz", action: 'delete'}, // will not delete the tgz 
              //{dest: 'assets/large/', exclude: "**/*copy*", flipExclude: true, action: 'delete'}, // will delete everything that has copy in the name 
            ]
          },
          download_production: {
            options: {
              bucket: 'freeroamingsolutions.com'
            },
            files: [
              {dest: '.', cwd: 'backup/', action: 'download'}, // Downloads the content of app/ to backup/ 
              //{dest: 'assets/', cwd: 'backup-assets/', exclude: "**/*copy*", action: 'download'}, // Downloads everything which doesn't have copy in the name 
            ]
          },
        },

    });
 
    // Define Tasks
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
 
        grunt.task.run([
            'clean:server',
            'jekyll:server',
//            'sass:server',
            'autoprefixer',
            'uglify',
            'connect:livereload',
            'watch'
        ]);
    });
 
    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });
 
    grunt.registerTask('build', [
        'clean:dist',
        'jekyll:dist',
        'imagemin',
        'svgmin',
        'copy:dist_tmp',
//        'sass:dist',
// doesn't work: maybe the popup modal's have dynamic styles which this removes?
//        'uncss',
        'processhtml',
        'autoprefixer',
        'cssmin',
        'uglify',
        'critical',
        'htmlmin',
        'copy:dist',
        'copy:dist_fonts',
    ]);
 
    grunt.registerTask('deploy', [
        'build',
        'copy:dist',
        'compress',
        'aws_s3:production',
        'aws_s3:productionGZipped',
    ]);
 
    grunt.registerTask('default', [
        'serve'
    ]);
};
