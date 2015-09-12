/**
 *
 */

define(["jquery", "d3", "app-d3"], function($, d3, appChart) {

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

        // New line chart using functional programming
        plotPieChart : function () {
            var _chart = {}; // Functional object

            // default vars
            var _width = 600, // width
                _height = 600, // height
                _margins = { top: 30, right: 30, bottom: 30, left: 30 }, //margins
                _data = [], // data object
                _svg, // svg element
                _bodyG,
                _pieG,
                _radius = 200,
                _innerRadius = 100,
                _colors = d3.scale.category20b();

            // Chart height
            _chart.height = function (height) {
                // If no height return default/existing.
                // So calling this function without a parameter is same as reading the value of _height
                if (!arguments.length) return _height;
                _height = height; // Set as default for usage elsewhere
                return _chart; // Return object so chained calls can be done on object
            }
            // width
            _chart.width = function (w) {
                if (!arguments.length) return _width;
                _width = w;
                return _chart;
            }
            // margins
            _chart.margins = function (m) {
                if (!arguments.length) return _margins;
                _margins = m;
                return _chart;
            }
            // radius
            _chart.radius = function (r) {
                if (!arguments.length) return _radius;
                _radius = r;
                return _chart;
            }
            // inner Radius
            _chart.innerRadius = function (r) {
                if (!arguments.length) return _innerRadius;
                _innerRadius = r;
                return _chart;
            }

            // Rendering

            // rendering svg
            _chart.render = function () {
                // create svg element if none exists. Use the attrs available
                if (!_svg) {
                    _svg = d3.select("#da-preview-canvas").append("svg")
                        .attr({
                            "height" : _height,
                            "width" : _width,
                        });
                }
                // Render chart
                _chart.renderBody(_svg);
            }
            // render clip path for paintable
            _chart.defineClipPath = function (svg) {
                var padding = 5;
                // Using defs element for late rendering and referencing
                svg.append("defs")
                    .append("clipPath")
                    .attr("id", "clippath")
                    .append("rect")
                    .attr({
                        "x" : 0,
                        "y" : 0,
                        "width" : _chart.canvasWidth() - 2 * padding,
                        "height" : _chart.canvasHeight(),
                    });
            }

            // append a g element to the svg and transform, so all charting will show within this 'body'
            _chart.renderBody = function (svg) {
                if (!_bodyG) {
                    _bodyG = svg.append("g")
                        .attr({
                            "class" : "chart-body",
                        });
                }
                // render pie
                _chart.renderPie();
            }

            // render pie chart
            _chart.renderPie = function () {
                // Pie layout to use in formating our data to be used in drawing an arc
                var pie = d3.layout.pie()
                    // sort by position on array. Without this, will sort by size (value)
                    .sort(function (d, i) {
                        return i;
                    })
                    .value(function (d, i) {
                        return d;
                    });

                // Arc to be drawn
                var arc = d3.svg.arc()
                    .outerRadius(_radius)
                    .innerRadius(_innerRadius);

                // Render pie chart container g
                if (!_pieG) {
                    _pieG = _bodyG.append("g")
                        .attr({
                            "class" : "pie",
                            "transform" : "translate(" + _radius + "," + _radius + ")"
                        });

                }

                // Render slices
                _chart.renderPieSlices(pie, arc);
                // Render labels
                _chart.renderPieLabels(pie, arc);
            }

            _chart.renderPieSlices = function (pie, arc) {
                var pieData = pie(_data);
                // Bind data
                var slices = _pieG.selectAll("path.arc")
                    .data(pieData)
                    .enter()
                    .append("path")
                    .attr({
                        "class" : "arc",
                        "fill" : function (d, i) {
                            return _colors(i);
                        }
                    });

                // For fine transition effect using tweening
                slices.transition()
                    .duration(2000)
                    .attrTween("d", function (d) {
                        var currentArc = this.__current__;

                        // Starting arc
                        if (!currentArc) {
                            currentArc = {
                                startAngle : 0,
                                endAngle : 0
                            };
                        }

                        var interpolate = d3.interpolate(currentArc, d);
                        this.__current__ = interpolate(1);

                        return function (t) {
                            return arc(interpolate(t));
                        }
                    });

            }

            _chart.renderPieLabels = function (pie, arc) {
                // Bind data
                var labels = _pieG.selectAll("text.label")
                    .data(pie(_data))
                    .enter()
                    .append("text")
                    .attr({
                        "class" : "label",
                        "dy" : "0.35em",
                        "text-anchor" : "middle"
                    });

                labels.data(pie(_data))
                    .transition()
                    .duration(2000)
                    .text(function (d) {
                        return d.value;
                    })
                    .attr({
                        "transform" : function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        },
                    });
            }

            // paintable width
            _chart.canvasWidth = function () {
                return _width - _margins.left - _margins.right;
            }
            // canvas height
            _chart.canvasHeight = function () {
                return _height - _margins.top - _margins.bottom;
            }
            // x start position
            _chart.xStart = function () {
                return _margins.left;
            }
            // x end position
            _chart.xEnd = function () {
                return _width - _margins.right;
            }
            // y start position. For this we are negating the y value so y starts counting from _margin.bottom
            _chart.yStart = function () {
                return _height - _margins.bottom;
            }
            // y end position
            _chart.yEnd = function () {
                return _margins.top;
            }

            // Manually setting Data for this example
            _chart.addSeries = function (series) {
                // _data.push(series);
                _data = series;
                return _chart;
            }

            // Return object instance
            return _chart;
        },
        
        // SVG DOM container selection
        canvas : null,
        
        // App entry point
        start : function () {
            
            console.log("Starting here");
            
            // Select dom container
            this.canvas = d3.select("#da-preview-canvas");

            /*
                var lineChart = this.plotLineChart();

                var dt = [],
                    dt2 = [];
                dataset.forEach(function (data, i) {
                    dt.push({
                        x: i,
                        y: data
                    });
                    dt2.push({
                        x: i,
                        y: data
                    });
                });

                lineChart.addSeries(dt);
                lineChart.addSeries(dt2);

                lineChart.x(d3.scale.linear()
                       .domain([0, (dt.length - 1)])
                    )
                    .y(d3.scale.linear()
                       // .domain([0, 1]) // for offset expand
                        .domain([0, (2 * d3.max(dt, function (d) {
                            return d.y;
                        }))])
                    )
                    // .r(d3.scale.linear().domain(d3.extent(dt, function (d) {
                    //    return d.y;
                    // })))
                    .render();

                // Pie chart
                // var pieChart = this.plotPieChart().addSeries(dataset).render();

                return;
                */
            
            // Get data file and set data object
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
            
            // references to 'this' for callback functions
            var self = this;
            
            // Initialise data
            self.dataInit(self.data.file, self.data.type, function (data) {
                /**
                 * Prepare data
                 * @TODO this should be done authomatically
                 */
                data.forEach(function (d, i) {
                    d["x"] = new Date(d.Year, 0, 1);
                    d["y"] = d.Urban;
                });
                
                self.chart({
                    "data" : data
                });
            });
            
            // Update widget form before submitting
            $("#widget-form").submit(function (e) {
                // Set query string to form to be saved on server
                $("#w_data_xml").val(self.saveSVG());
                $('#w_data').val(JSON.stringify(self.QUERY));
            });

            // Defaults
            this.QUERY = {
                "type" : "bar",
                "showLabels" : true,
                "showDots" : false,
                "area" : false
            };

            // Query Events
            $("#w-graph-type").on("change", {}, function (e) {
                var value = e.target.value;
                // Update query and run graph
                // self.QUERY.type = value;
                // Run graph
                self.chart({
                    "data" : self.data.data,
                    "type" : value
                });
                // self.d3init();
                // self.run();
            });

        },
        
        // Chart 
        chart : function (options) {
            /**
            var chart = chart()
                .data(data) // Attach data
                .chart("bar") // Type of graph
                .margin("top", 40) // Margin top
                .height(400)
                .width(800)
                // Testing with time scale for Year field
                .x(d3.time.scale()
                    .domain(d3.extent(data, function (d) {
                        var date = new Date(d.Year, 0, 1); // 01-01-YYYY
                            return date;
                        }))
                )
                .y(d3.scale.linear()
                    .domain([0, (d3.max(data, function (d) {
                        return d.y;
                    }))])
                );

            d3.select("#da-preview-canvas").call(chart.render);
            */
            /*
            // Add labels after graph has been drawn
            if (this.QUERY.showLabels) {
                this.plotLabels();
            }
            this.QUERY.showLabels = true; // Restore default

            // Render dots
            if (this.QUERY.showDots) {
                this.plotDots();
            }
            this.QUERY.showDots = false; // Restore default
            */
            
            // if options is undefined
            options = (!options) ? {} : options;
            // Initialise and render chart
            var chart = appChart();
            
            // Attach data
            if (options.data) {
                var data = options.data;
                
                // Attach data
                chart.data(data);
                // Configure scales
                // Testing with time scale for Year field
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
            
            // Type of graph
            if (options.type) {
                if (options.type == "line" || options.type == "line-area") {
                    // show dots
                    this.QUERY.showDots = true;
                }
                
                chart.chart(options.type);
            } else if (this.QUERY) {
                chart.chart(this.QUERY.type);
            }
            
            // Set rendering options
            chart.options(this.QUERY);
            // remove existing svg 
            this.canvas.selectAll("svg").remove();
            // Call chart.render on svg canvas selection
            this.canvas.call(chart.render);
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
                case "line-area" :
                    this.QUERY.area = true;
                    this.plotLineGraph();
                    break;
                case "arc" :
                    this.plotArc();
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
            if (this.QUERY.showLabels) {
                this.plotLabels();
            }
            this.QUERY.showLabels = true; // Restore default

            // Render dots
            if (this.QUERY.showDots) {
                this.plotDots();
            }
            this.QUERY.showDots = false; // Restore default

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

        plotArc : function () {
            console.log("Plotting arc");
            var self = this;
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

        plotLineGraph : function () {
            console.log("Plotting line graph");
            var self = this;

            var lineCoords = d3.svg.line()
                .x(function (d, i) {
                    var x = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.LEFT;
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

            // Hide labels for line graph
            self.QUERY.showLabels = false;
            // Show dots on line graph
            self.QUERY.showDots = true;

            // var linePath = self;
            var line = self.svg.append("path").attr(attrs);

            // Render area
            if (this.QUERY.area) {
                console.log("Adding area");
                var area = d3.svg.area()
                    .x(function (d, i) {
                        var x = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.LEFT;
                        return x;
                    })
                    .y0(function (d, i) {
                        return self.yScale(0);
                    })
                    .y1(function (d, i) {
                        return self.yScale(d.Urban);
                    })
                    .interpolate("linear");

                self.svg.selectAll("path.area")
                    .data([self.data.data]) // @TODO: find out why without extra [] the area functions wont run
                    .enter()
                    .append("path")
                    .classed("area", true)
                    .attr({
                        "d" : function (d, i) {
                            console.log(area(d));
                            return area(d);
                        }
                    });
            }
            this.QUERY.area = false; // Restore default

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

        plotDots : function () {
            var self = this;
            // Render dots
            this.svg.append("g").selectAll("circle")
                .data(this.data.data)
                .enter()
                .append("circle")
                .classed("dots", true)
                .attr({
                    "cx" : function (d, i) {
                        var cx = i * ((self.WIDTH - self.PADDING.LEFT ) / self.data.data.length) + self.PADDING.LEFT;
                        return cx;
                    },
                    "cy" : function (d, i) {
                        var cy = self.yScale(d.Urban);
                        return cy;
                    },
                    "r" : function (d, i) {
                        return 5;
                    }
                });
        }

    }

    // Return
    return Awesome;
});
