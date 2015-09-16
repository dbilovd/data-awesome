require.config({
    // Paths
	paths : {
		"jquery" : [
			"lib/jquery-1.11.2"
		],
        "iFrameResizer" : [
            "lib/iframeResizer"
        ]
	},

	// Shims
	shim : {
        'iFrameResizer' : {
            deps : ['jquery'],
            exports : "iFrameResizer"
        }
	}
});

require(["embed-app"], function (AwesomeEmbed) {
	
    AwesomeEmbed.start();

});
