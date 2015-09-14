require.config({
	urlArgs: "bust=" + (new Date()).getTime(), // No caching of files (DEV)
    
    paths : {
        "jquery" : [
            "lib/jquery-1.11.2"
        ],
        "d3" : [
            "lib/d3"
        ]
    },
    
    shim : {
    }
});

require(["jquery", "d3", "app"], function ($, d3, Awesome) {
    
    // jQuery no conflict
    ejq = $.noConflict();
    
    // Get query
    if (ejq("#w_data_query").length > 0) {
        var query = ejq("#w_data_query").data("query");
        
        if (query instanceof Object) {
            var awesome = Awesome;
            
            Awesome.start();
            Awesome.canvas = d3.selectAll("#canvas");
            Awesome.QUERY = query;
            // Awesome.chart();
        }
    }
    
});
