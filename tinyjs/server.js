/*eslint no-console: 0, no-unused-vars: 0*/
/*eslint-env node, es6 */
"use strict";

const xsjs  = require("@sap/xsjs");
const xsenv = require("@sap/xsenv");
const port  = process.env.PORT || 3000;

const options = {
	// anonymous : true, // remove to authenticate calls
	auditLog : { logToConsole: true }, // change to auditlog service for productive scenarios
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("XSA / NodeJS Server listening on port %d", port);
