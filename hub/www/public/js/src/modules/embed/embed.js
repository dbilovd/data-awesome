/**
 * embed.js
 * ./src/modules/embed/embed.js
 */

// Requires
var $ = require("jquery"),
	clipboard = require("clipboard");

var embed = {
	/**
	 * init
	 */
	init : function () {
		console.log("Initialising Embed page app");
		this.run();
	},

	/**
	 * run
	 */
	run : function () {
		console.log("running embed page app.");
		console.log(clipboard);
	}
};

// Export
module.exports = embed;