const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const SendEmail = require("./backend/email.js");

try {
  require("electron-reloader")(module);
} catch {}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile(`index.html`);
}

app.whenReady().then(() => {
  app.allowRendererProcessReuse = true;
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("send-email", (event, arg) => {
  const par = JSON.parse(arg);
  const { email, csvData, user } = par;

  csvData.forEach((contact) => {
    SendEmail(email, user, contact)
      .then((res) => {
        event.sender.send("reply-email", res);
      })
      .catch((err) => {
        console.log(err);
        event.sender.send("reply-email", err);
      });
  });
});
