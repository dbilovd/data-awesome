/**
 *
 */

define(["jquery", "d3", "app-d3"], function($, d3, AwesomeChart) {

    // Sample data
    // var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    // var dataset = [
    //      [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21],
    //      [220, 88],
    // ];

    var Awesome = {
        
        // Query for graph
        QUERY : {
            type : "bar", // default graph type bar
        },
        // SVG DOM container selection
        canvas : null,
        
        // App entry point
        start : function () {
            // Select dom container
            this.canvas = d3.select("#da-preview-canvas");
            
            // Set defaulfs
            this.QUERY = {
                "type" : "bar",
                "showLabels" : true,
                "showDots" : false,
                "area" : false
            };
            
            // Initialise defaults from graph
            try {
                if ($("#w_data_query").length > 0) {
                    // Set defaults to the last saved query - if any.
                    var dataQuery = $("#w_data_query").val();
                    this.QUERY = (dataQuery) ? JSON.parse(dataQuery) : this.QUERY;
                }
            } catch (e) {
                console.log(e);
                return;
            }
            
            // references to 'this' for callback functions
            var self = this;
            
            // Initialise data
            self.dataInit(function (data) {
                /**
                 * Prepare data
                 * @TODO this should be done authomatically
                 */
                data.forEach(function (d, i) {
                    // console.log(d3.keys(d));
                    d["x"] = new Date(d.Year, 0, 1);
                    d["y"] = d.Urban;
                });
                
                // Build graph
                self.chart({
                    "data" : data
                });
            });
            
            /**
             * Events Listeners
             *
             */
            
            // on Form Submit
            $("#widget-form").submit(function (e) {
                // Set query string to form to be saved on server
                $("#w_data_xml").val(self.svgToXML());
                $('#w_data').val(JSON.stringify(self.QUERY));
            });

            // on Bar type change
            $("#w-graph-type").on("change", {}, function (e) {
                var value = e.target.value;
                // Update query
                self.QUERY.type = value;
                // Build graph
                self.chart({
                    "data" : self.data.data,
                    "type" : value
                });
            });

        },
        
        // Chart 
        chart : function (options) {
            // options have to be available even just as an empty object
            options = (!options) ? {} : options;
            
            // Initialise and render chart
            var chart = AwesomeChart();
            
            // Attach data
            if (options.data) {
                // Attach data from options
                var data = options.data;
                chart.data(data);
                
                // Configure scales
                // Testing with time scale for Year field
                // @TODO this should be done authomatically
                chart.x(d3.time.scale()
                    .domain(d3.extent(data, function (d) {
                        var date = new Date(d.Year, 0, 1); // 01-01-YYYY
                        return date;
                    }))
                )
                chart.y(d3.scale.linear()
                    .domain([0, (d3.max(data, function (d) {
                        return d.y;
                    }))])
                );
            }
            
            // Set type of chart
            if (options.type) {
                // show dots on line, line-area and scatter charts
                if (options.type == "line" || options.type == "line-area") {
                    this.QUERY.showDots = true;
                }
                
                chart.chart(options.type);
            } else if (this.QUERY) {
                chart.chart(this.QUERY.type);
            }
            
            // Set all other rendering options for chart
            chart.options(this.QUERY);
            // remove existing svg in canvas
            this.canvas.selectAll("svg").remove();
            // Call chart.render on svg canvas selection
            this.canvas.call(chart.render);
        },

        /**
         * Initialise data from a data file url embeded in DOM
         *
         */
        dataInit : function (callback) {
            var self = this;
            
            // Initialise data from dataset file and set data object
            try {
                // check for data-file
                if ($("#w_data_file").length > 0) {
                    // Attach data file to object
                    self.data = {
                      'file' : $("#w_data_file").val(),
                      'type' : $("#w_data_file").data("type")
                    };

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
                    if (self.data.type) {
                        switch (self.data.type) {
                            case "csv" :
                                d3.csv(self.data.file, dataLoaded);
                                break;
                            case "tsv" :
                                d3.tsv(self.data.file, dataLoaded);
                                break;
                            case "json" :
                                d3.json(self.data.file, dataLoaded);
                                break;
                            default :
                                // Load JSON data by default
                                d3.json(self.data.file, dataLoaded);
                                break;
                        }
                    } else {
                        // Load JSON data by default
                        d3.json(self.data.file, dataLoaded);
                    }
                    
                } else {
                    // Throw exception
                    throw "noDataFileFound";
                }
            } catch (e) {
                console.log(e);
                return;
            }

        },

        // Key Function
        dataKey : function (data, index) {
            return data["Year"];
        },

        svgToXML : function () {
            // Fetch SVG from DOM
            var svg = $("#da-preview-canvas svg")[0];
            // use XMLSerializer to generate xml
            var xmlSerialised = new XMLSerializer();
            var xml = xmlSerialised.serializeToString(svg);
            return xml;
        },

        plotScatterDiagram : function () {
            console.log("Ploting scatter diagram");
            var self = this;

            var attrs = {
                "cx" : function (d, i) {
                    var x = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.LEFT;
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
        },

    }

    // Return
    return Awesome;
});
