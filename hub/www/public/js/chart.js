 // New line chart using functional programming
plotLineChart = function () {
    var _chart = {}; // Functional object
            
    // default vars
    var _width = 600, // width
        _height = 300, // height
        _margins = { top: 30, right: 30, bottom: 30, left: 30 }, //margins
        _x, // x scale
        _y, // y scale
        _data = [], // data object
        _svg, // svg element
        _bodyG,
        _line;
            
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
            // x scale
            _chart.x = function (x) {
                if (!arguments.length) return _x;
                _x = x;
                return _chart;
            }
            // y scale
            _chart.y = function (y) {
                if (!arguments.length) return _y;
                _y = y;
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
                    
                    // Render axis
                    _chart.renderAxes(_svg);
                    // Define clip path for svg
                    _chart.defineClipPath(_svg);
                }
                // Render chart
                _chart.renderBody(_svg);
            }
            
            // render axis
            _chart.renderAxes = function (svg) {
                // Render all axis inside one g element
                var axesG = svg.append("g").attr("class", "axes");
                _chart.renderXAxis(axesG);
                _chart.renderYAxis(axesG);
            }
            // render x axis
            _chart.renderXAxis = function (axesG) {
                // Add range to scale at this point
                // _x.range([0, _chart.canvasWidth()]);
                // Axis
                var xAxis = d3.svg.axis()
                    .scale(_x.range([0, _chart.canvasWidth()])) // Use _chart's x scale
                    .orient("bottom");
                // Draw
                axesG.append("g")
                    .attr({
                        "class" : "x-axis axis",
                        "transform" : "translate (" + _chart.xStart() + "," + _chart.yStart() + ")"
                    })
                    .call(xAxis);
                // Grid lines
                axesG.selectAll("g.x-axis .tick")
                    .append("line")
                    .attr({
                        "class" : "grid-line",
                        "x0" : 0,
                        "y0" : 0,
                        "x1" : 0,
                        "y1" : - _chart.canvasHeight(),
                    });
            }
            
            // render y axis
            _chart.renderYAxis = function (axesG) {
                // yAxis
                var yAxis = d3.svg.axis()
                    .scale(_y.range([_chart.canvasHeight(), 0]))
                    .orient("left");
                
                // Draw axis
                axesG.append("g")
                    .attr({
                        "class" : "y-axis axis",
                        "transform" : "translate (" + _chart.xStart() + "," + _chart.yEnd() + ")"
                    })
                    .call(yAxis);
                
                // Add grid lines
                axesG.selectAll("g.y-axis .tick")
                    .append("line")
                    .attr({
                        "class" : "grid-line",
                        "x0" : 0,
                        "y0" : 0,
                        "x1" : _chart.canvasWidth(),
                        "y1" : 0,
                    });
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
                        "x" : 0 - padding,
                        "y" : 0,
                        "width" : _chart.canvasWidth(),
                        "height" : _chart.canvasHeight(),
                    });
            }
            // append a g element to the svg and transform, so all charting will show within this 'body'
            _chart.renderBody = function (svg) {
                svg.append("g")
                    .attr({
                        "class" : "chart-body",
                        "transform" : "translate(" + _chart.xStart() + "," + _chart.yEnd() + ")",
                        "clip-path" : "clippath", // Reference clip path defined with _chart.defineClipPath
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
                _data.push(series);
                return _chart;
            }
            
            // Return object instance
            return _chart;
},

            
// Running chat above
start = function () {
            
    var lineChart = this.plotLineChart()
        .x(d3.scale.linear().domain([0, 10]))
        .y(d3.scale.linear().domain([0, 10]));
            
    dataset.forEach(function (data, i) {
        return lineChart.addSeries({
            x: i,
            y: data
        });
    });
            
    lineChart.render();
            
    return;
}