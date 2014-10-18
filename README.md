![notification](https://img.notmyhostna.me/047df78a4eac436396d9f6b0957c0a8ddfc198b6.png)

# ScreenUpload

A simple tool to automatically move, rename and upload screenshots from a specific location to a remote server via scp. Once successfully uploaded the image URL is copied to the clipboard.

# Installation


Make sure you have Node.JS and NPM installed.

**Clone the repository**

`git clone https://github.com/dewey/ScreenUpload`

**Install dependencies**

Navigate into the cloned directory and run `npm install` to install all the dependencies.

**Install the UserAgent**

Install the UserAgent which will keep the process running in the background by running `node install.js`. This will create and move the `screenupload.plist` to `~/Library/LaunchAgents`.

If you want to remove the UserAgent just use `node uninstall.js` and the UserAgent should be removed. If it’s not working just manually remove the plist from the LaunchAgent directory.

More information about LaunchAgents: [launchd.info](http://launchd.info/)

If you prefer a GUI use: [LaunchControl](http://www.soma-zone.com/LaunchControl/)

It’s also possible to load/unload/start/stop LaunchAgents with the following commands:
    
    launchctrl load screenupload.plist
    launchctrl unload screenupload.plist
    launchctl stop screenupload
    launchctl start screenupload

**Check if process is running**

If everything’s running your Activity Monitor should have a process called `ScreenUpload`.

**Debugging**

If there are any problems use Console.app to check `~/Library/Logs/ScreenUpload` for the error logs.

# Licence

The MIT License (MIT)

Copyright (c) 2014 dewey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
