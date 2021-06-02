'use strict'

import { app, protocol, BrowserWindow, ipcMain, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import path from 'path';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  let win;
  let displays = screen.getAllDisplays();
  let width = displays.map((item) => item.workArea.width).reduce((width, number) => width + number);
  let height = displays.map((item) => item.workArea.height).sort((a, b) => b - a)[0];
  console.log("displays =>", displays);

  let externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  );
  

  // Create the browser window.

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x - 1920,
      y: externalDisplay.bounds.y,
      width: 1200,
      height: 600,
      minWidth: 940,
      minHeight: 560,
      frame: false,
      show: false,
      webPreferences: {
        webviewTag: true,
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      },
    });
    win.setSize(width, height);
  } else {
    win = new BrowserWindow({
      width: 1200,
      height: 600,
      frame: false,
      minWidth: 940,
      minHeight: 560,
      show: false,
      webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      },
    });
  }




  win.setMenuBarVisibility(false)

  win.once('ready-to-show', () => {
    win.show();// exibi depois que carrega
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  //close app 
  ipcMain.on('closeApp', () => {
    win.close()
  })

  //maximize app 
  ipcMain.on('maximizeApp', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })

  //minimize app 
  ipcMain.on('minimizeApp', () => {
    win.minimize()
  })

  // check if is maximized
  win.on('maximize', () => {
    win.webContents.send('isMaximized');
  })

  // check if is restored
  win.on('unmaximize', () => {
    win.webContents.send('isRestored');
  })

}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
