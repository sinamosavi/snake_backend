var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/devwp', // Connection string for your MongoDB database
    cloud: '/Users/Sina/WebstormProjects/mench_backend-master/cloud.js', // Absolute path to your Cloud Code
    appId: 'myAppId123456',
    javascriptKey: '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p',
    masterKey: 'myMasterKey123456', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:8030/wp', // Don't forget to change to https if needed
    liveQuery: {
        classNames: ['test'],
        redisURL: 'redis://127.0.0.1:6379'
    },
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:8030/wp",
            "appId": "myAppId123456",
            "masterKey": "myMasterKey123456",
            "appName": "MyApp"
        }
    ]
}, options);

// Serve the Parse API on the /parse URL prefix
app.use('/wp', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(8030, function() {
    console.log('parse-server-example running on port 8030.');
});

ParseServer.createLiveQueryServer(httpServer,  {
    appId: 'myAppId123456',
    keyPairs: {
        javascriptKey: '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p',
        masterKey: 'myMasterKey123456', // Keep this key secret!
    },
    serverURL: 'http://localhost:8030/wp',
    websocketTimeout: 10 * 1000,
    cacheTimeout: 60 * 600 * 1000,
    logLevel: 'VERBOSE',
    redisURL: 'redis://localhost:6379'
});

module.exports = app