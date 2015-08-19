require.config({
    // Paths
	paths : {
		"jquery" : [
			"lib/jquery-1.11.2"
		],
	},

	// Shims
	shim : {
	}
});

require(["embed-app"], function (AwesomeEmbed) {
    
    AwesomeEmbed.start();
    
});