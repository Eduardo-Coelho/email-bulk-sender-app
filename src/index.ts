import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { Contact, SendEmail } from "./backend/email";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("send-email", (event: IpcMainEvent, arg) => {
  const par = JSON.parse(arg);
  const { emailTemp, csvData, user } = par;

  csvData.forEach((contact: Contact) => {
    SendEmail(emailTemp, user, contact)
      .then((res) => {
        event.sender.send("reply-email", res);
      })
      .catch((err) => {
        console.log(err);
        event.sender.send("reply-email", err);
      });
  });
});
