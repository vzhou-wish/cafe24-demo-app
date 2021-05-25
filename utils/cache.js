const NodeCache = require( "node-cache" );
//global variables - probably bad pratice but ... 
global.nodeCache = global.nodeCache || new NodeCache()
exports.cache = global.nodeCache;