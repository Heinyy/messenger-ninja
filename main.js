const { app, BrowserWindow, session } = require('electron');

function createWindow() {

  const win = new BrowserWindow({
    width: 1000,
    height: 750,
    backgroundColor: "#0f0f0f",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Bloquer tout sauf Messenger
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {

    const blocked = [
      "stories",
      "reels",
      "watch",
      "marketplace",
      "gaming",
      "groups",
      "feed"
    ];

    if (blocked.some(word => details.url.includes(word))) {
      return callback({ cancel: true });
    }

    callback({});
  });

  win.loadURL("https://www.facebook.com/messages");

}

app.whenReady().then(createWindow);

