function uploadFile(callback) {
    scp.send({
        file: filepathNew,
        user: scpUser,
        host: scpHost,
        port: scpPort,
        path: scpRemotePath
    }, function uploadDone(err) {
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

                // Log to console to make it easier to retrieve past uploads (if enabled in the config file)
                if (config.app.archive.logging) {
                    var upload = db.get(imageName);
                    console.log(colors.green(upload.url) + " - " + moment.unix(upload.date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                }
            }

            // Copy to clipboard
            copy(imageRemoteURL);

            // Send notification to OS
            notifier.notify({
                'title': 'ScreenUpload',
                'subtitle': 'Upload finished',
                'contentImage': filepathNew,
                'message': 'The URL is now in your clipboard.',
                'open': 'file://' + __dirname + '/archive/' + imageNameNew
            });
            callback();
        }
    });
}