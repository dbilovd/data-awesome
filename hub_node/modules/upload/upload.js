/**
 * /modules/upload/upload.js
 * Upload module entry file
 *
 */

var express = require("express"),
	router = require("./upload.router");

// Module
var uploadMod = {};
uploadMod.router = router; // router

// Exports
module.exports = uploadMod;
