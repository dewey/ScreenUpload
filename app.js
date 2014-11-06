var scp = require('scp'),
    config = require('./config'),
    sha1 = require('sha1'),
    fs = require('fs'),
    path = require('path'),
    clipboard = require("copy-paste").global(),
    notifier = require('node-notifier'),
    flatfile = require('flat-file-db'),
    moment = require('moment'),
    colors = require('colors/safe'),
    gaze = require('gaze');

var screenshotDirectory = config.app.screenshotDirectory;
var screenshotDirectoryArchive = config.app.screenshotDirectoryArchive;
var screenshotName = config.app.screenshotName;
var scpUser = config.app.scpUser;
var scpHost = config.app.scpHost;
var scpPort = config.app.scpPort;
var scpRemotePath = config.app.scpRemotePath;
var scpRemoteURL = config.app.scpRemoteURL;
if (config.app.archive.enabled) {
    var db = flatfile.sync(config.app.archive.db);
}

// Watch provided path from config for new files matching the screenshot default name.
gaze(screenshotName, {
    cwd: screenshotDirectory
}, function(err, watcher) {
    if (err) {
        console.log(err)
    } else {
        // Watch for 'added' event
        this.on('added', function(filepath) {
            // Create temp file name for uploading and move to archive.
            var imageName = sha1(filepath);
            var imageNameNew = imageName + path.extname(filepath);
            var filepathNew = screenshotDirectoryArchive + imageNameNew;
            var imageRemoteURL = scpRemoteURL + imageNameNew;
            fs.renameSync(filepath, filepathNew)

            // Upload file
            scp.send({
                file: filepathNew,
                user: scpUser,
                host: scpHost,
                port: scpPort,
                path: scpRemotePath
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    // Write to DB if feature enabled in config
                    if (config.app.archive.enabled) {
                        var timestamp = moment().unix();
                        db.put(imageName, {
                            filename: imageNameNew,
                            url: imageRemoteURL,
                            date: timestamp
                        });
                    }

                    // Copy to clipboard
                    copy(imageRemoteURL);

                    notifier.notify({
                        'title': 'ScreenUpload',
                        'subtitle': 'Upload finished',
                        'contentImage': filepathNew,
                        'message': 'The URL is now in your clipboard.',
                        'open': 'file://' + __dirname + '/archive/' + imageNameNew
                    });

                    // Log to console to make it easier to retrieve past uploads (if enabled in the config file)
                    if (config.app.archive.enabled && config.app.archive.logging) {
                        var upload = db.get(imageName);
                        console.log(colors.green(upload.url) + " - " + moment.unix(upload.date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                    }
                }
            });
        });
    }
});