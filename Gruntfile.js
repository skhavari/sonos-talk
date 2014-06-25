// ===========================================================================
// source code layout
// ===========================================================================
//
//
//   |-- websrc           ----- all web client related assets/codes
//   |   |-- assets/      ----- all images, 3rd party css, etc
//   |   |-- <folder>/    ----- a module containg js, html tmpl, css
//   |   |-- app.js       ----- main web app js source file
//   |   |-- style.styl   ----- main web app stylus source file
//   |   |-- index.jade   ----- main web app html template
//
//
// ===========================================================================

var f_build	 = './webroot/';    // build output directory
var src      = './websrc/';	    // source files root

// define the files for each file type
var f_js     = { src: ['*.js',   '*/*.js'  ] };
var f_jade   = { src: ['*.jade', '*/*.jade'], ext: '.html', extDot: 'last' };
var f_styl   = { src: ['*.styl', '*/*.styl'], ext:  '.css', extDot: 'last' };
var f_assets = { src: ['*'],                  cwd: src + 'assets/'         };

// dump em in an array so we can loop 
var f_srcs = [f_assets, f_js, f_jade, f_styl];

for( var i = 0; i < f_srcs.length; i++ ){
	
	// add common attributes
	f_srcs[i].cwd        = f_srcs[i].cwd || src;
	f_srcs[i].dest       = f_build;
	f_srcs[i].expand     = true;
	f_srcs[i].watch_files = [];

	// combine cwd and src for the watch task
	for( var j = 0; j < f_srcs[i].src.length; j++ )
		f_srcs[i].watch_files.push(f_srcs[i].cwd + f_srcs[i].src[j]);
}


module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt configuration
	grunt.initConfig({

		//  copy assets & js to build directory without modification
		copy   : { assets : f_assets,       js : f_js },

		//  compile css templates
		stylus : { files  : f_styl },

		//  compile html templates
		jade   : { files  : f_jade },

		// remove files from build directory
		clean  : { build  : f_build },

		// watch for changes, build in real-time, reload browser if debugging
		watch  : {
			options: { livereload: true },
			assets : { files: f_assets.watch_files,   tasks: ['copy:assets'] },
			js     : { files: f_js.watch_files,       tasks: ['copy:js'    ] },
			stylus : { files: f_styl.watch_files,     tasks: ['stylus'     ] },
			jade   : { files: f_jade.watch_files,     tasks: ['jade'       ] }
		}

	});

	grunt.registerTask('default', ['copy', 'stylus', 'jade']);
}