const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
// import { app, BrowserWindow } from "electron";
// import * as path from "path";
const preloadApi = path.join(__dirname, "./preload/index.js");

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		// 自定义头部栏
		// frame: false,
		webPreferences: {
			/**
			 * preload:
			 * pecifies a script that will be loaded before other scripts run in the page.
			 * This script will always have access to node APIs no matter whether node integration is turned on or off.
			 * The value should be the absolute file path to the script.When node integration is turned off,
			 * the preload script can reintroduce Node global symbols back to the global scope
			 */
			preload: preloadApi,
			/**
			 * 在渲染进程中启用node
			 */
			nodeIntegration: false,
			// 启用preload.js作为main和renderer的通讯媒介，所以不要隔离上下文
			contextIsolation: false,
		},
	});

	// and load the index.html of the local app under production mode.
	win.loadFile("app:// .index.html/#");
	// win.loadFile("index.html");

	// or load the remote html form the vite server
	win.loadURL("http://localhost:3060/");

	// Open the DevTools.
	win.webContents.openDevTools();
	/*隐藏electron创听的菜单栏*/
	Menu.setApplicationMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
