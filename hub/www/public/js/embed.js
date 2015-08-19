/* js/embed.js */
(function() {
    
    /**
     * @todo RequireJS noConflict
     */
    // Load and run requirejs
	(function (callback) {
		var requireUrl = "http://da-hub.local.dev/js/lib/require.js";
        var script = document.createElement("script");
        script.src = requireUrl;
        script.async = true;
        script.setAttribute("data-main", "http://da-hub.local.dev/js/embed-main.js");
        script.onload = script.onreadystatechange = function () {
            var readyState = script.readyState;

            if (!readyState || /complete||loaded/.test(script.readyState)) {
              callback();

              script.onload = null;
              script.onreadystatechange = null;
            }
        }
        
        var entry = document.getElementsByTagName("script")[0];
        entry.parentNode.insertBefore(script, entry);
	})(function () {
    	// Use require.js to run embed app
        console.log("require js loaded");
    });
    
})();