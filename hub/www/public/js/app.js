/**
 *
 */

define(["jquery", "d3"], function($, d3) {

    // Sample data
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			// var dataset = [
	  //           [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21],
	  //           [220, 88],
	  //       ];

    var Awesome = {
        // Query for graph
        QUERY : {
            type : "bar", // default graph type bar
        },
        HEIGHT : null,
        WIDTH : null,
        /*
        PADDING : {
            TOP : null,
            RIGHT : null,
            BOTTOM : null,
            LEFT : null,
        }
        */
        PADDING : null,

        // App entry point
        start : function () {
            // self
            var self = this;

            // Set defaults height and width to parent's container
            this.WIDTH = $("#da-preview-canvas").width();
//            this.HEIGHT = (this.WIDTH / 10);
            this.HEIGHT = 300;
            this.PADDING = 30;

            // Initialise D3 svg canvas
            this.d3init();

//            updated3
            function updateGraph (e) {
                var value = e.target.value;
                if (isNaN(value)) {
                    e.target.value = "";
                    return;
                }

                // Update vars
                switch (e.data.field) {
                    case "width" :
                        self.WIDTH = value;
                        break;
                    case "height" :
                        self.HEIGHT = value;
                        break;
                    case "padding" :
                        self.PADDING = value;
                        break;
                }

                // Rebuild graph
                self.d3init();
                // Run graph
                self.run();
            };

            // Update graph
            $("#widget-form").submit(function (e) {
                // for test
//                 e.preventDefault();

                console.log(e);
                $("#w_data_xml").val(self.saveSVG());
                $('#w_data').val(JSON.stringify(self.QUERY));
                // stringify
            });

            // Settings Events
            $("#w-graph-width").on("change", {
                field : "width"
            }, updateGraph);
            $("#w-graph-height").on("change", {
                field : "height"
            }, updateGraph);
            $("#w-graph-padding").on("change", {
                field : "padding"
            }, updateGraph);

            // Defaults
            this.QUERY = {
                "type" : "bar",
                "labels" : true,
            };

            // Query Events
            $("#w-graph-type").on("change", {}, function (e) {
                var value = e.target.value;
                // Update query and run graph
                self.QUERY.type = value;
                self.d3init();
                self.run();
            });

            // Run graph on page load
            this.run();
        },

        // Initialise D3 svg canvas
        d3init : function () {
            // Remove any existing svg
            if (this.svg) {
                this.svg.remove();
            }

            // Create new SVG canvas for graph
            this.svg = d3.select("#da-preview-canvas").append("svg")
                        .attr({
                            "height" : this.HEIGHT,
                            "width" : this.WIDTH,
                        })
                        .style("border", "1px solid");

            // Set us x & y axis
            this.xScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function (d) {
                                var xs = d[0] ? d[0] : d;
                                return xs;
                            })])
                            .range([0, this.WIDTH - this.PADDING]);

            this.yScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function (d) {
                                var ys = d[1] ? d[1] : d;
                                return ys;
                            })])
                            .range([this.HEIGHT - this.PADDING, this.PADDING]);
            this.xAxis = d3.svg.axis().scale(this.xScale).orient("bottom");
            this.yAxis = d3.svg.axis().scale(this.yScale).orient("left");

        },

        run : function () {
            console.log(this);
            switch (this.QUERY.type) {
                case "bar" :
                    this.plotBarGraph();
                    break;
                case "scatter" :
                    this.plotScatterDiagram();
                    break;
                case "line" :
                    this.plotLineGraph();
                    break;
                default :
                    this.plotBarGraph();
                    break;
            }
        },

        // Run function to finalise graph.
        finish : function () {

            // Add labels after graph has been drawn
            if (this.QUERY.labels) {
                this.plotLabels();
            }
            // Restore defaults
            this.QUERY.labels = true;

            // Plot axis
            this.svg.append("g").call(this.xAxis).attr({
                "class" : "axis",
                "transform" : "translate (" + this.PADDING + ", " + (this.HEIGHT - this.PADDING) + ")",
            });
            this.svg.append("g").call(this.yAxis).attr({
                "class" : "axis",
                "transform" : "translate (" + this.PADDING + ", 0)",
            });
        },
        
        saveSVG : function () {
            console.log("Saving as SVG");
            
            // get svg in DOM
            var svg = $("#da-preview-canvas svg")[0];
            console.log(svg);
            // use XMLSerializer to generate xml
            var xml = (new XMLSerializer).serializeToString(svg);
            console.log(xml);
            
            return xml;
        },

        plotBarGraph : function () {
            console.log("plotting bar chart");
            var self = this;
            // Attrs
            var attrs = {
                "width" : function (data) {
                    // Use a dynamic width for each bar by diving the width of the graph by the number of
                    // bars available.
                    // Optionally you can add a space between each bar by subtracting a number - space - from
                    // the calculated width.
                    var width = (self.WIDTH / dataset.length);
                    width = width - 10; // Add a space of 10 between each bar
                    return width;
                },
                "fill" : function (data, index) {
                    return "teal";
                },
                "x" : function (data, index) {
                    var x = index * ((self.WIDTH - self.PADDING ) / dataset.length) + self.PADDING;
                    return x;
                },
                "y" : function (data, index){
                    // To Plot each bar starting from the bottom of the graph. We plot the hightest point first as y
                    // then plot the base of the bar as the height from that point.
                    // So y becomes the difference between the height of the graph and the height of the bar - data
                    // and padding in our case.
                    // Data might be modified depending on the height being used. Eg: if data is multiplied for longer
                    // bars.

                    // Using a dynamic data attr by calling the height function of this attrs object
                    //var y = self.HEIGHT - (attrs.height(data, index) + self.PADDING);
                    //y = self.HEIGHT - (data + self.PADDING);
                    //return y;

                    // Using scales, plot the point here and let attrs.height calculate for height.
                    return self.yScale(data);

                },
                "height" : function (data, index) {
                    // This is the value of each data.
                    // Optionally you can multiply or divide it by a factor to increase the heights of each bar
                    // in the graph. Or use scales to have dynamic scalling.
                    return self.HEIGHT - (attrs.y(data, index) + self.PADDING);
                }
            };

            // Plot graph of rects
            var rects = self.svg.selectAll("rect").data(dataset).enter()
              .append("rect").attr(attrs);

            // Finalise graph
            self.finish();
        },

        plotScatterDiagram : function () {
            console.log("Ploting scatter diagram");
            var self = this;

            var attrs = {
                "cx" : function (data, index) {
                    var x = index * ((self.WIDTH - self.PADDING ) / dataset.length) + self.PADDING;
                    return x;
                },
                "cy" : function (data, index) {
                    return self.yScale(data);
                    return self.HEIGHT - (data * 10 - self.PADDING);
                },
                // Dynamic size of ticks
                "r" : function (data, index) {
                    return Math.sqrt(data);
                },
            }

            // plot graph
            var circles = self.svg.selectAll("circle").data(dataset).enter()
                .append("circle").attr(attrs);


            self.finish();
        },

        plotLineGraph : function () {
            console.log("Plotting line graph");
            var self = this;


            var lineCoords = d3.svg.line()
                .x(function (data, index) {
                    var x = index * ((self.WIDTH - self.PADDING ) / dataset.length) + self.PADDING;
                    return x;
                })
                .y(function (data, index) {
                    return self.yScale(data);
                    // return self.HEIGHT - (data * 10 - self.PADDING);
                })
                .interpolate("linear");

            var attrs = {
                "d" : lineCoords(dataset),
                "stroke" : "red",
                "stroke-width" : "2px",
                "fill" : "none"
            };

            // Disable labels for line graph
            self.QUERY.labels = false;

            // var linePath = self;
            var line = self.svg.append("path").attr(attrs);

            self.finish();
        },

        plotLabels : function () {
            console.log("Adding text labels");
            var self = this;

            var attrs = {
                "x" : function (data, index) {
                    var x = index * ((self.WIDTH - self.PADDING ) / dataset.length) + (self.PADDING + 5);
                    return x;
                },
                "y" : function (data, index) {
                    var y = self.yScale(data) + self.PADDING;
                    return y;
                },
                "fill" : "red",
                "font-family" : "sans-serif",
                "font-size" : "12px",
            };

            self.svg.selectAll("text").data(dataset).enter().append("text")
                .text(function (data, index) {
                    return data;
                })
                .attr(attrs);
        }

    }

    // Return
    return Awesome;
});
