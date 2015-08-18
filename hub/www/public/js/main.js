/**
 *
 */
// Configuation

require.config({
    waitSeconds: 0, // Wait for each module indefinitely
	urlArgs: "bust=" + (new Date()).getTime(), // No caching of files (DEV)

	// Paths
	paths : {
		"jquery" : [
			"lib/jquery-1.11.2"
		],
		"d3" : [
			"lib/d3"
		]
	},

	// Shims
	shim : {
		"d3" : {
			exports : "d3"
		}
	}
});

// Run app
require(['app'], function(Awesome) {
    
    // Start app
	Awesome.start();
    
});