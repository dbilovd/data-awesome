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
            this.HEIGHT = (this.WIDTH / 2);
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
            };
            
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
            
            // Query Events
            $("#w-graph-type").on("change", {}, function (e) {
                var value = e.target.value;
                this.QUERY.type = value;
            });
            
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
                                return d[0];
                            })])
                            .range([0, this.WIDTH - this.PADDING]);
                                    
            this.yScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function (d) {
                                return d[1];
                            })])
                            .range([this.HEIGHT - this.PADDING, 0]);
            this.xAxis = d3.svg.axis().scale(this.xScale).orient("bottom");
            this.yAxis = d3.svg.axis().scale(this.yScale).orient("left");
            
        },
        
        run : function () {
            console.log(this.QUERY);
            this.plotBarGraph();
        },
        
        // Run function to finalise graph.
        finish : function () {
            // Plot axis
            this.svg.append("g").call(this.xAxis).attr({
                "transform" : "translate (" + this.PADDING + ", " + (this.HEIGHT - this.PADDING) + ")",
            });
            this.svg.append("g").call(this.yAxis).attr({
                "transform" : "translate (" + this.PADDING + ", 0)",
            });
        },
        
        plotBarGraph : function () {
            var self = this;
            var rects = this.svg.selectAll("rect").data(dataset).enter().append("rect")
                .attr({
                    "x" : function (data, index) {
                        var x = index * ((self.WIDTH - self.PADDING ) / dataset.length) + self.PADDING;
                        return x;
                    },
                    "y" : function (data, index){
                        var y = self.HEIGHT - (data + self.PADDING );
                        return y;
                    },
                    "width" : function (data) {
                        var width = (self.WIDTH / dataset.length) - 15;
                        return width;
                    },
                    "height" : function (data, index) {
                        return data * 40;
                    }
                });
            
            self.finish();
        }
    }
    
    // Return
    return Awesome;
});
