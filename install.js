var Service = require('node-mac').Service,
    config = require('./config');

// Create a new service object
var svc = new Service({
    name: 'ScreenUpload',
    description: 'Install the ScreenUpload Deamon watching a defined path for new screenshots.',
    script: 'app.js',
    runAsUserAgent: true,
    cwd: config.install.cwd
});

svc.on('install', function() {
    svc.start();
});

svc.install();