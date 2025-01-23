import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

const createSplashWindow = () => {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  splashWindow.loadFile('splash.html');
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load your Next.js app URL in development or the built version in production
  const startURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../web/out/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow?.show();
  });
};

app.whenReady().then(() => {
  createSplashWindow();
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
