var config = {}

config.install = {};
config.app = {};

// Working directory, usually the place where you cloned the script to
config.install.cwd = __dirname;

// Directory where screenshots are stored. That's where the script is watching for new screenshots.
config.app.screenshotDirectory = process.env.HOME + '/Desktop';

// Screenshot name we are looking for
config.app.screenshotName = 'Screen\ Shot *.png';

// Directory where all screenshots are copied to before uploading. They'll remain there.
config.app.screenshotDirectoryArchive = __dirname + '/archive/'

// Remote server username
config.app.scpUser = 'dewey';

// Remote server hostname. Make sure it matches an entry in ~/.ssh/config
config.app.scpHost = 'notmyhostna.me';

// The port used for scp
config.app.scpPort = '22';

// The port where the image will be stored on the remote server. Make sure the aforementioned
// user has write permissions to that directory.
config.app.scpRemotePath = '/var/www/img.notmyhostna.me/';

// The URL which is mapped to the scpRemotePath
config.app.scpRemoteURL = 'https://img.notmyhostna.me/';

module.exports = config;