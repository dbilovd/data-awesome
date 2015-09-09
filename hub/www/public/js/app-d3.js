/**
 *
 *
 */

define(["d3"], function(d3) {

    return function () {
        // Reusable chat functional object
        var chart = {};

        /**
         * Defaults
         *
         */
        var width = 600,
            height = 300,
            margins = {
                top : 30,
                right: 30,
                bottom: 30,
                left: 30
            };


        /**
         * Setters/Getters
         */
        // width
        chart.width = function (w) {
            // Setter
            if (!arguments.length) return width;
            // Getter
            width = w;
            // Returning 'constructor' object for other function's to chain unto to
            return chart;
        }

        // height
        chart.height = function (h) {
            if (!arguments.length) return height;
            height = h;
            return chart;
        }

        // margins
        chart.margin =  function (margin, value) {
            // View margins object
            if (!arguments.length) return margins;

            // Set margin(s)
            if (arguments.length == 1) {
                if (typeof margin == 'string' || margin instanceof String) {
                    // Get margin property
                    return margins[margin];
                } else {
                    // Set margins using object parsed (only matching fields)
                    try {
                        // check if both are objects
                        if (margin instanceof Object) {
                            // get object keys
                            var marginsKeys= Object.keys(margins);
                                marginKeys = Object.keys(margin);

                            for (var i = 0; i < marginKeys.length; i++) {
                                var value = marginKeys[i];
                                if (marginsKeys.indexOf(value) != -1) {
                                    margins[value] = margin[value];
                                }
                            }
                        } else {
                            throw "Object expected, found " + margin;
                        }
                    } catch (e) {
                        console.trace();
                        return;
                    }

                    return chart;
                }
            }
            // Set a single margin
            margins[margin] = value;
            return chart;
        }

        // Return chart object
        return chart;
    }
});
