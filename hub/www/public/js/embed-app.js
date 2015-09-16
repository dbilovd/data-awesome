/**
 *
 */
define(['jquery', 'iFrameResizer'], function ($, iFrameResizer) {
    
    // jQuery noConflict
    jq = $.noConflict();

    // AwesomeEmbed app objet
    var AwesomeEmbed = {};

    // Start/init function
    AwesomeEmbed.start = function () {
        // Get all element with class 'data-awesome-widget'
        // loop through and add an iframe to each of them
        jq("div.data-awesome-widget").each(function () {
            // Get data attributes
            var widgetData = jq(this).data();
            
            // iFrame URL
            var iframeURL = "http://da-hub.local.dev/js/embed.html";
            // Add widget id to query url
            if (jq(this).data("widgetId")) {
                iframeURL = iframeURL + "/" + jq(this).data("widgetId");
            } else {
                console.log("No data widget-id");
                return;
            }

            // Insert iframe
            var iframe = document.createElement("iframe");
            iframe.id = "data-awesome-widget-" + jq(this).data("widgetId");
            iframe.style.width = jq(this).data("width") ? jq(this).data("width") : "100%"; // Default width fill container
            iframe.style.height = jq(this).data("height") ? jq(this).data("height") : "100%"; // Default height 300px
            iframe.style.border = jq(this).data("border") ? "2px solid" : "none"; // Default DONT show border
            iframe.src = iframeURL; // iFrame's url
            iframe.scrolling = "no";
            
            // Append iframe to container
            jq(iframe).appendTo(this);
            
            // run iframeResizer options
            jq(iframe).iFrameResize({
                sizeHeight: true,
                sizeWidth: true,
            });
        });
    }

    // Return app object
    return AwesomeEmbed;

})
