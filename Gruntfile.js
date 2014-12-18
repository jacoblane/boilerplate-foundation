module.exports = function(grunt)
{
	// -----------------------------------------
	// Start Grunt configuration
	// -----------------------------------------

	grunt.initConfig({

		// Load package.json file
		pkg: grunt.file.readJSON('package.json'),


		// --------------------------------------
		// Clean Configuration
		// --------------------------------------

		clean: {
			options: {
				force: true
			},
			js:    ["dist/assets/js/"],
			css:   ["dist/assets/css/"],
			assets: [
				"dist/assets/*",
				"!dist/assets/.gitignore"
			]
		},


		// --------------------------------------
		// Sass Configuration
		// --------------------------------------

		sass: {
			options: {
				loadPath: ['bower_components/foundation/scss',
									 'bower_components/foundation-icon-fonts']
			},
			dist: {
				options: {
					sourcemap: 'none',
					style: 'nested'
				},
				files: [{
					expand: true,
					cwd: 'develop/scss',
					src: ['*.scss'],
					dest: 'dist/assets/css',
					ext: '.css'
				}]
			}
		},


		// --------------------------------------
		// CSS Minify Configuration
		// --------------------------------------

		cssmin: {
			combine: {
				files: {
					'dist/assets/css/style.min.css': ['dist/assets/css/style.css']
				}
			}
		},


		// --------------------------------------
		// Concatenate Configuration
		// --------------------------------------

		concat: {
			options: {
				separator: ';'
			},
			script: {
				src: [
					'bower_components/foundation/js/foundation/foundation.js',
					'bower_components/foundation/js/foundation/foundation.alert.js',
					'bower_components/foundation/js/foundation/foundation.abide.js',
					'bower_components/foundation/js/foundation/foundation.joyride.js',
					'bower_components/foundation/js/foundation/foundation.reveal.js',
					// ...more foundation JS you might want to add
					'develop/js/script.js'
				],
				dest: 'dist/assets/js/script.js'
			},
			modernizr: {
				src: [
					'bower_components/modernizr/modernizr.js',
					'develop/js/custom.modernizr.js'
				],
				dest: 'dist/assets/js/modernizr.js'
			}
		},


		// --------------------------------------
		// Uglify Configuration
		// --------------------------------------

		uglify: {
			dist: {
				files: {
					'dist/assets/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
					'dist/assets/js/modernizr.min.js': ['dist/assets/js/modernizr.js'],
					'dist/assets/js/script.min.js': ['dist/assets/js/script.js']
				}
			}
		},


		// --------------------------------------
		// Image minify Configuration
		// --------------------------------------

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd:  'develop/img/',
					src:  ['**/*.{png,jpg,gif}'],
					dest: 'dist/assets/img/'
				}]
			}
		},

		// --------------------------------------
		// Move over font files
		// --------------------------------------
		copy: {
			files: {
				cwd: 'bower_components/foundation-icon-fonts/',  // set working folder / root to copy
				src: '**/*.{eot,svg,ttf,woff}',           // copy all files and subfolders
				dest: 'dist/assets/css',    // destination folder
				expand: true           // required when using cwd
			}
		},

		// --------------------------------------
		// Watch Configuration
		// --------------------------------------

		watch: {
			grunt: { files: ['Gruntfile.js'], tasks: ['default'] },

			sass: {
				files: 'develop/scss/**/*.scss',
				tasks: ['buildCss']
			},

			script: {
				files: 'develop/js/**/*.js',
				tasks: ['buildJs']
			},

			images: {
				files: 'develop/img/**/*.{png,jpg,gif}',
				tasks: ['buildImg']
			},
			jade: {
				files: 'develop/templates/**/*.jade',
				tasks: ['buildJade']
			}
		},

		jade: {
			//no_options: {
			//	files: {
			//		'dist/': ['templates/*.jade']
			//	}
			//},
			html: {
				files: {
					'dist/': ['develop/templates/*.jade']
				},
				options: {
					client: false
				}
			}
		}

	});


	// -----------------------------------------
	// Load Grunt tasks
	// -----------------------------------------

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');



	// -----------------------------------------
	// Register Grunt tasks
	// -----------------------------------------

	grunt.registerTask('buildImg', ['newer:imagemin']);
	grunt.registerTask('buildCss', ['clean:css', 'sass', 'cssmin', 'copy']);
	grunt.registerTask('buildJs',  ['clean:js', 'concat', 'uglify']);
	grunt.registerTask('buildJade',  ['jade']);
	grunt.registerTask('moveFonts', ['copy']);
	grunt.registerTask('default',  ['clean', 'buildCss', 'buildJs', 'buildImg', 'copy', 'jade', 'watch']);
}
