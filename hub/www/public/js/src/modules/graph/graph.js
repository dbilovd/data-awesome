/**
 * graph.js
 * ./src/modules/graph/graph.js
 */

var Marionette = require("backbone.marionette");

var graph = {
	init : function () {
		console.log("initialising graph app");
		this.run();
	},

	run : function () {
		// New Marionette Application
		var GraphManager = new Marionette.Application();

		// Start application
		GraphManager.start();
	}
};

module.exports = graph;