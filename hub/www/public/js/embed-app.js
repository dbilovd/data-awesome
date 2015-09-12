/**
 *
 */
define(['jquery'], function ($) {
    // jQuery noConflict
    jq = $.noConflict();

    // AwesomeEmbed app objet
    var AwesomeEmbed = {};

    // Start/init function
    AwesomeEmbed.start = function () {
        // Get all element with class 'data-awesome-widget'
        // loop through and add an iframe to each of them
        jq("div.data-awesome-widget").each(function () {
            console.log(this);
            // Get data attributes
            var widgetData = jq(this).data();
            console.log(widgetData);

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
            iframe.style.width = jq(this).data("width") ? jq(this).data("width") : "800px"; // Default width 500px
            iframe.style.height = jq(this).data("height") ? jq(this).data("height") : "400px"; // Default height 300px
            iframe.style.border = jq(this).data("border") ? "2px solid" : "none"; // Default DONT show border
            iframe.src = iframeURL; // iFrame's url

            // Append iframe to container
            jq(iframe).appendTo(this);
        });
    }

    // Return app object
    return AwesomeEmbed;

})
