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
            var self = this;
            try {
                // check for data-file
                if ($("#w_data_file").length > 0) {
                    // Attach data file to object
                    this.data = {
                      'file' : $("#w_data_file").val(),
                      'type' : $("#w_data_file").data("type")
                    };
                } else {
                    // Throw exception
                    throw "noDataFileFound";
                }
            } catch (e) {
                console.log(e);
                return;
            }

            // Initialise data
            this.dataInit(this.data.file, this.data.type, function (data) {
                // Initialise d3 and run after data has been initialised
                self.d3init();
                self.run();
            });

            // self
            var self = this;

            // Set defaults height and width to parent's container
            this.WIDTH = $("#da-preview-canvas").width();
            this.HEIGHT = 300;
            this.PADDING = {
              LEFT : 30,
              TOP : 20,
              RIGHT : 20,
              BOTTOM : 20
            };

            // Update callback for svg images
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
                        // self.PADDING = value;
                        break;
                }

                // Rebuild graph
                self.d3init();
                // Run graph
                self.run();
            };

            // Update graph
            $("#widget-form").submit(function (e) {
                // Set query string to form to be saved on server
                $("#w_data_xml").val(self.saveSVG());
                $('#w_data').val(JSON.stringify(self.QUERY));
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

        },

        // Initialise data
        dataInit : function (dataFile, type, callback) {
            var self = this;

            // Callback function
            function dataLoaded (error, data) {
                try {
                    if (error) {
                        // Throw exception
                        throw "dataLoadError";
                    } else {
                        // Save data to app object
                        self.data['data'] = data;
                    }
                } catch (e) {
                    console.trace("Error:" + e);
                    return;
                }

                // Run callback function
                callback(data);
                return;
            }

            // Use d3's loading data function depending on the type of data file
            if (type) {
                switch (type) {
                    case "csv" :
                        d3.csv(dataFile, dataLoaded);
                        break;
                    case "tsv" :
                        d3.tsv(dataFile, dataLoaded);
                        break;
                    case "json" :
                        d3.json(dataFile, dataLoaded);
                        break;
                    default :
                        // Load JSON data by default
                        d3.json(dataFile, dataLoaded);
                        break;
                }
            } else {
                // Load JSON data by default
                d3.json(dataFile, dataLoaded);
            }

        },

        // Key Function
        dataKey : function (data, index) {
            return data["Year"];
        },

        // Initialise D3 svg canvas
        d3init : function () {
            // Remove any existing svg
            if (this.svg) {
                this.svg.remove();
            }

            // Data index this local scope
            // console.log(this.PADDING);
            data = this.data.data;

            /*
            // nesting
            var nested = d3.nest()
                .key(function (d) {
                    return d.Year;
                })
                .entries(data);
            console.log(nested);
            return;
            */
            // console.log(data.length);
            // edata = d3.layout.stack()(data);
            // console.log(edata);
            // data = dataset;

            // Create new SVG canvas for graph
            this.svg = d3.select("#da-preview-canvas").append("svg")
                .attr({
                    "height" : this.HEIGHT,
                    "width" : this.WIDTH,
                })
                // .append("g")
                // .attr({
                //   "transform" : "translate(" + 20 + ", " + (this.HEIGHT - this.PADDING.TOP) + ")"
                // })
                ;

            // Set us x & y axis
            // x ordinal scale
            // xScale = d3.scale.ordinal()
            //   .rangeRoundBands([0, this.WIDTH - this.PADDING.LEFT - this.PADDING.RIGHT]);
            /*
            // x Linear
            this.xScale = d3.scale.linear()
                .domain(d3.extent(data, function (d) {
                    return d.Year;
                }))
                .range([0, this.WIDTH - this.PADDING]);
            */
            // x time
            this.xScale = d3.time.scale()
                .domain(d3.extent(data, function (d) {
                    var date = new Date(d.Year, 0, 1); // 01-01-YYYY
                    return date;
                }))
                .range([0, this.WIDTH - (this.PADDING.LEFT + this.PADDING.RIGHT)]);

            this.yScale = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.Urban;
                })])
                .range([this.HEIGHT - this.PADDING.TOP, this.PADDING.BOTTOM]);

            this.rScale = d3.scale.linear()
                .domain(d3.extent(data, function(d) {
                    return d.Urban;
                }))
                .range([10, 20]);

            // Axis
            this.xAxis = d3.svg.axis()
                .scale(this.xScale)
                .orient("bottom")
                .ticks(data.length)
                .tickFormat(function (d, i) {
                    // return in time format
                    return d3.time.format("%Y")(d);
                });

            // yAxis
            this.yAxis = d3.svg.axis()
                .scale(this.yScale)
                .orient("left")
                .ticks(10);

        },

        run : function () {
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

            var self = this;

            // Add labels after graph has been drawn
            if (this.QUERY.labels) {
                this.plotLabels();
            }
            // Restore defaults
            this.QUERY.labels = true;

            // Plot axis
            this.svg.append("g")
                .call(this.xAxis)
                .attr({
                    "class" : "x-axis",
                    "transform" : "translate (" + this.PADDING.LEFT + ", " + (this.HEIGHT - this.PADDING.BOTTOM) + ")",
                });

            // x grid lines
            this.svg.selectAll("g.x-axis .tick")
                .append("line")
                .classed("grid-line", true)
                .attr({
                    "x0" : 0,
                    "y0" : 0,
                    "x1" : 0,
                    "y1" : function (d, i) {
                        return 0 - (self.HEIGHT - (self.PADDING.TOP + self.PADDING.BOTTOM));
                    }
                });

            // y axis
            this.svg.append("g")
                .call(this.yAxis)
                .attr({
                    "class" : "y-axis",
                    "transform" : "translate (" + this.PADDING.LEFT + ", 0)",
                });

            // y horizontal grid lines
            this.svg.selectAll("g.y-axis .tick")
                .append("line")
                .classed("grid-line", true)
                .attr({
                    "x0" : 0,
                    "y0" : 0,
                    "x1" : function (d, i) {
                        return self.WIDTH - (self.PADDING.LEFT + self.PADDING.RIGHT);
                    },
                    "y1" : 0,
                });
        },

        saveSVG : function () {
            // Fetch SVG from DOM
            var svg = $("#da-preview-canvas svg")[0];
            // use XMLSerializer to generate xml
            var xmlSerialised = new XMLSerializer();
            var xml = xmlSerialised.serializeToString(svg);
            return xml;
        },

        plotBarGraph : function () {
            console.log("plotting bar chart");
            var self = this;
            // Attrs
            var attrs = {
                "width" : function (d, i) {
                    // Use a dynamic width for each bar by diving the width of the graph by the number of
                    // bars available.
                    // Optionally you can add a space between each bar by subtracting a number - space - from
                    // the calculated width.
                    var width = ((self.WIDTH - (self.PADDING.LEFT + self.PADDING.RIGHT)) / self.data.data.length);
                    width = width - 10;
                    return width;
                },
                "fill" : function (d, i) {
                    /**
                     * TODO: search why function only returns one color for all bars;
                     */
                    var colorScale = d3.scale.category10(),
                        color = colorScale(i);
                    return color;
                },
                "x" : function (d, i) {
                    var x = (i * (attrs.width(d, i) + 10) + self.PADDING.LEFT);
                    return x;
                },
                "y" : function (d, i){
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
                    return self.yScale(d.Urban);

                },
                "height" : function (d, i) {
                    // This is the value of each data.
                    // Optionally you can multiply or divide it by a factor to increase the heights of each bar
                    // in the graph. Or use scales to have dynamic scalling.
                    var height = self.HEIGHT - (attrs.y(d, i) + self.PADDING.BOTTOM);
                    return height;
                }
            };

            // Plot graph of rects
            var rects = self.svg.selectAll("rect")
                .data(self.data.data, self.dataKey)
                .enter()
                .append("rect")
                .attr(attrs);

            // Finalise graph
            self.finish();
        },

        plotScatterDiagram : function () {
            console.log("Ploting scatter diagram");
            var self = this;

            var attrs = {
                "cx" : function (d, i) {
                    var x = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.RIGHT;
                    return x;
                },
                "cy" : function (d, i) {
                    return self.yScale(d.Urban);
                },
                // Dynamic size of ticks
                "r" : function (d, i) {
                    var r = self.rScale(d.Urban);
                    return r;
                },
            }

            // plot graph
            var circles = self.svg.selectAll("circle")
                .data(self.data.data)
                .enter()
                .append("circle")
                .attr(attrs);

            self.finish();
        },

        plotLineGraph : function () {
            console.log("Plotting line graph");
            var self = this;

            var lineCoords = d3.svg.line()
                .x(function (d, i) {
                    var x = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.RIGHT;
                    return x;
                })
                .y(function (d, i) {
                    var y = self.yScale(d.Urban);
                    return y;
                })
                .interpolate("linear");

            var attrs = {
                "d" : lineCoords(self.data.data),
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
            var self = this;

            var attrs = {
                "x" : function (d, i) {
                    var x = i * ((self.WIDTH - self.PADDING.LEFT ) / dataset.length) + (self.PADDING.RIGHT + 5);
                    return x;
                },
                "y" : function (d, i) {
                    var y = self.yScale(d.Urban) + self.PADDING.TOP;
                    return y;
                },
                "fill" : "red",
                "font-family" : "sans-serif",
                "font-size" : "12px",
            };

            self.svg.selectAll("text").data(self.data.data).enter().append("text")
                .text(function (d, i) {
                    return d.Urban;
                })
                .attr(attrs);
        }

    }

    // Return
    return Awesome;
});
