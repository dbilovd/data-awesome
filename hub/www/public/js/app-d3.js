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
        var width = 600, // width
            height = 300, // height
            // margins
            margins = {
                top : 30,
                right: 30,
                bottom: 30,
                left: 30
            },
            colors = d3.scale.category20(),
            // scales
            scales = {
                x : "",
                y : "",
                r : ""
            },
            data, // Data
            options = {}, // Chart options
            // Default chart to plot: Bar
            chartType = "bar",
            // UI Elements
            svg, // parent svg element
            chartG // Chart g element to hold chart
            ;


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

        /**
         * chart.margin
         * Set up margins
         */
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
        
        /**
         *
         *
         */
        chart.colors = function (c) {
            if (!arguments.length) return colors;
            colors = c;
            return chart;
        }
        
        /**
         * scales
         */
        

        /**
         * chart.x
         */
        chart.x = function (s) {
            if (!arguments.length) return scales.x;
            scales.x = s;
            return chart;
        }
        
        /**
         * chart.scale.y
         *
         */
        chart.y = function (s) {
            if (!arguments.length) return scales.y;
            scales.y = s;
            return chart;
        }
        
        /**
         * chart.scale.r
         *
         */
        chart.r = function (s) {
            if (!arguments.length) return scales.r;
            scales.r = s;
            return chart;
        }
        
        /**
         * chart.data
         *
         */
        chart.data = function (d) {
            if (!arguments.length) return data;
            data = d;
            return chart;
        }
        
        /**
         *
         *
         */
        chart.options = function (o) {
            if (!arguments.length) return options;
            options = o;
            return chart;
        }
        
        /**
         * chart.chart
         * type of chart to plot
         */
        chart.chart = function (c) {
            if (!arguments.length) return chartType;
            chartType = c;
            return chart;
        }
        
        /**
         * Internal calculation's functions based on chart settings
         *
         */
        
        /**
         * canvasWidth
         * (width - (margins.right + margins.left))
         */
        var canvasWidth = function () {
            return width - (margins.left + margins.right);   
        }
        
        /**
         * canvasHeight
         * (height - (margins.top + margins.bottom))
         */
        var canvasHeight = function () {
            return height - (margins.top + margins.bottom);
        }
        
        /**
         * x in (x, y) = (0, 0)
         */
        var xStart = function () {
            return margins.left;
        }
        
        /**
         * x in (x, y) = (n, n)
         */
        var xEnd = function () {
            return width - margins.right;
        }

        /**
         * y in (x, y) = (0, 0)
         */
        var yStart = function () {
            return height - margins.bottom;
        }
        
        /**
         * y in (x, y) = (n, n)
         */
        var yEnd = function () {
            return margins.top;
        }
        
        /**
         * Rendering
         *
         */
        
        /**
         * public render function
         * NB: This should be called last because it doesn't return an instance of the chart object
         */
        chart.render = function (selection) {
            
            // Create SVG element
            if (!svg) {
                svg = selection.append("svg")
                    .attr({
                        "height" : height,
                        "width" : width
                    });
                
                // Render axes
                // @Todo: make this configurable
                renderAxes(svg);
                
                // Render clip path. All canvas drawings would be done on this protruding elements will be clipped
                renderCanvasClipPath(svg);
            }
            
            // Finally Render chart
            renderChart(svg);
        }
        
        /**
         * render axes
         *
         */
        var renderAxes = function (svgElement) {
            // Render axis in a g element
            var axesG = svgElement.append("g")
                .attr("class", "axes");
            
            // Render x axis
            renderXAxis(axesG);
            // Render y axis
            renderYAxis(axesG);
        }
        
        /**
         * render x axis inside an svg element
         *
         */
        var renderXAxis = function (svgElement) {
            // Add range to scale at this point
            scales.x.range([0, canvasWidth()]);
            
            // Number of ticks
            var ticks = function () {
                var ticks = Math.max(canvasWidth() / (data.length * 4), 2);
                return ticks;
            };
            
            // Axis
            var xAxis = d3.svg.axis()
                .scale(scales.x) // Use x scale
                .orient("bottom")
                .ticks(5)
                // .ticks(ticks()) // @TODO after working graph come back and fix this to dynamic value
                .tickFormat(function (d, i) {
                    // return in time format
                    return d3.time.format("%Y")(d);
                });
            
            // Draw
            svgElement.append("g")
                .attr({
                    "class" : "x-axis axis",
                    "transform" : "translate (" + xStart() + "," + yStart() + ")"
                })
                .call(xAxis);
            
            // Grid lines
            svgElement.selectAll("g.x-axis .tick")
                .append("line")
                .attr({
                    "class" : "grid-line",
                    "x0" : 0,
                    "y0" : 0,
                    "x1" : 0,
                    "y1" : - canvasHeight(),
                });
        }
        
        /**
         * render y axis inside an svg element
         *
         */
        var renderYAxis = function (svgElement) {
            // yAxis
            scales.y.range([canvasHeight(), 0]);
            
            // Number of ticks
            var ticks = function () {
                var ticks = Math.max(canvasHeight() / (data.length * 4), 2);
                return ticks;
            };
            
            var yAxis = d3.svg.axis()
                .scale(scales.y)
                .orient("left")
                .ticks(5);
                // .ticks(ticks()); // @TODO: same as on xAxis

            // Draw axis
            svgElement.append("g")
                .attr({
                    "class" : "y-axis axis",
                    "transform" : "translate (" + xStart() + "," + yEnd() + ")"
                })
                .call(yAxis);

            // Add grid lines
            svgElement.selectAll("g.y-axis .tick")
                .append("line")
                .attr({
                    "class" : "grid-line",
                    "x0" : 0,
                    "y0" : 0,
                    "x1" : canvasWidth(),
                    "y1" : 0,
                });
        }
        
        /**
         * private render chart canvas drawable area (clip path)
         * 
         */
        var renderCanvasClipPath = function (svgElement) {
            // Render clip path inside svgElement
            var padding = 5; // adding a small padding
            // use defs because of late rendering
            svgElement.append("defs").append("clipPath")
                .attr({
                    "id" : "clip-path",
                })
                .append("rect") // Used for rectangular shape
                .attr({
                    "width" : canvasWidth() - (2 * padding),
                    "height" : canvasHeight() - (2 * padding),
                    "x" : 0,
                    "y" : 0
                });
        }
        
        /**
         * renderChart
         *
         */
        var renderChart = function (svgElement) {
            if (!chartG) {
                // Setup g element to place chart in
                chartG = svgElement.append("g")
                    .attr({
                        "class" : "chart",
                        "transform" : "translate(" + xStart() + "," + yEnd() + ")",
                        "clip-path" : "clippath", // Reference clip path defined with renderCanvasClipPath
                    });
            }
            
            // Call chart functions based on chartType
            switch (chartType) {
                // line
                case "line" :
                    plotLineChart(); // plot line
                    if (options.showDots) {
                        plotDots();
                    }
                    break;
                    
                // line-area
                case "line-area" :
                    plotLineChart(); // plot line
                    plotArea(); // Show area
                    
                    if (options.showDots) {
                        plotDots();
                    }
                    break;
                    
                // scatter
                case "scatter" :
                    plotScatterChart();
                    break;
                    
                // bar (default)
                case "bar":
                default :
                    plotBarChart();
                    break;
            }
        }
        
        /**
         * Actual chart plots
         *
         */
        
        /**
         * plot bar chart
         */
        var plotBarChart = function () {
            // Padding between bars
            var barPadding = 2;
            
            // Plot graph into chart g element
            chartG.selectAll("rect.bars")
                .data(data)
                .enter()
                .append("rect")
                .attr({
                    "class" : "bars"
                });

            var attrs = {
                "x" : function (d, i) {
                    return scales.x(d.x);
                },
                "y" : function (d, i) {
                    return scales.y(d.y);
                },
                "width" : function (d, i) {
                    return Math.floor(canvasWidth() / data.length) - barPadding;
                },
                "height" : function (d, i) {
                    return canvasHeight() - scales.y(d.y);
                }
            };
            
            chartG.selectAll("rect.bars")
                .data(data)
                .transition()
                .attr(attrs);
        }
        
        /**
         * Plot Line Chart
         *
         */
        var plotLineChart = function () {
            
            // NB: Axis should have ran already, so x and y have a range, since those are not suplied at start
            // Draw a line with each x, y point calculate using x and y scales
            var line = d3.svg.line()
                .x(function (d, i) {
                    return scales.x(d.x);
                })
                .y(function (d, i) {
                    if (!options.stacked)  {
                        var y = scales.y(d.y);
                    } else { // For stacked data
                        var y = scales.y(d.y + d.y0);
                    }
                    
                    return y;
                })
                .interpolate("linear");

            //
            chartG.selectAll("path.chart-line") // select all paths with the line class we give
                //.data([data]) // bind data
                .data(data)
                .enter()
                .append("path")
                .attr({
                    "fill": "none",
                    "stroke" : function (d, i) {
                        return colors(i);
                    },
                    "class" : "chart-line" // class to uniquely identify the lines of this graph from other path elements in svg
                });

            // Transition line into place
            chartG.selectAll("path.chart-line")
                // .data([data])
                .data(data)
                .transition()
                .attr({
                    "d" : function (d, i) { // Draw line
                        return line(d); // d here isn't a single data but a line of datas
                    }
                });
        }
        
        /**
         * Plot Scatter chart
         *
         */
        var plotScatterChart = function () {
            // Just plot only dots
            plotDots();
        }
        
        /**
         * Plot Areas
         *
         */
        var plotArea = function () {
            
            var drawArea = function (data) {
                // Area generation function
                var area = d3.svg.area()
                    .x(function (d, i) {
                        return scales.x(d.x);
                    })
                    .y0(canvasHeight())
                    .y1(function (d, i) {
                        if (!options.stacked) {
                            return scales.y(d.y);
                        } else {
                            return scales.y(d.y0 + d.y1);
                        }
                    });
                
                // Draw path with area data
                chartG.selectAll("path.chart-area")
                    .data(data)
                    .enter()
                    .append("path")
                    .attr({
                        "class" : "chart-area",
                    })
                    .style({
                        "fill" : function (d, i) {
                            return colors(i);
                        },
                        "opacity" :  "0.2"
                    });

                // Handle transition
                chartG.selectAll("path.chart-area")
                    .data(data)
                    .transition()
                    .attr({
                        "d" : function (d, i) {
                            return area(d);
                        }
                    });
                    
            }
            
            drawArea(data);
        }
        
        /**
         * Plot Dots
         *
         */
        var plotDots = function () {
            
            // r range
            if (scales.r) {
                scales.r.range([5, 15]);
            }
            
            var dots = function (dt) {
                    chartG.selectAll("circle.dots.dots")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr({
                            "class" : "dots dots",
                        })
                        .style({
                            "stroke" : function (d, i) {
                                return colors(i);
                            },
                            // Fill if r scale is available
                            "fill" : function (d, i) {
                                return (scales.r) ? colors(i) : "";
                            }
                        });

                    chartG.selectAll("circle.dots.dots")
                        .data(data)
                        .transition()
                        .attr({
                            "cx" : function (d, i) {
                                return scales.x(d.x);
                            },
                            "cy" : function (d, i) {
                                if (!options.stacked) {
                                    return scales.y(d.y);
                                } else {
                                    return scales.y(d.y + d.y0);
                                }
                            },
                            "r" : function (d, i) {
                                return (scales.r) ? scales.r(d.y) : 5;
                            }
                        });
            }

            dots(data);
        }
        
        // Return chart object
        return chart;
    }

});
