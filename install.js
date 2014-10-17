var Service = require('node-mac').Service;

    // Create a new service object
    var svc = new Service({
      name:'ScreenUpload',
      description: 'Install the ScreenUpload Deamon watching a defined path for new screenshots.',
      script: 'app.js'
    });

    svc.on('install',function(){
      svc.start();
    });

    svc.install();