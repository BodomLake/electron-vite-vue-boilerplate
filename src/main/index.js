const { app, BrowserWindow, Menu, session } = require("electron");
const path = require("path");
// Install `electron-debug` with `devtron`
// let debug = require("electron-debug")
// debug({ showDevTools: true, isEnabled: true });

// import { app, BrowserWindow } from "electron";
// import * as path from "path";
const preloadAPI = path.join(__dirname, "./preload/index.js");
const logger = require("electron-log");

function createWindow() {
	const win = new BrowserWindow({
		width: 1400,
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
			preload: preloadAPI,
			/**
			 * 在渲染进程中启用node
			 */
			nodeIntegration: false,
			// 启用preload.js作为main和renderer的通讯媒介，所以不要隔离上下文
			contextIsolation: false,
			// 使用remote模块
			// enableRemoteModule: true,
			// 同源策略是否开启
			webSecurity: true,
		},
	});

	// and load the index.html of the local app under production mode.
	// win.loadFile("app:// .index.html/#");
	// win.loadFile(".index.html");
	if (process.env.NODE_ENV !== "production") {
		win.loadURL("http://localhost:3060/");
	} else {
		// 把目标文件地址 设计为同级目录
		// win.loadFile(`file://${__dirname}/index.html`);

		// or load the remote html form the vite server
		win.loadURL("http://localhost:3060/");
	}
	// Open the DevTools.
	win.webContents.openDevTools();
	/*隐藏electron创听的菜单栏*/
	// Menu.setApplicationMenu(null);
}

function loadExtension() {
	const vueDevToolPath = path.join(
		__dirname,
		"../../extensions/vueDevTool/6.0.0.21"
	);
	const vueDevToolVersion = require(path.resolve(
		vueDevToolPath,
		"manifest.json"
	)).version;
	logger.log(
		"[Vue开发插件加载]",
		"[版本:]",
		vueDevToolVersion,
		"[路径:]",
		vueDevToolPath
	);

	// 在 Electron 13 移除了BrowserWindow.addExtension(path)	BrowserWindow.addDevToolsExtension(path);
	session.defaultSession.loadExtension(vueDevToolPath, {
		allowFileAccess: true,
	});
	/*	
	const reactDevToolPath = path.join(
		__dirname,
		"../../extensions/reactDevTool/4.23.0_0"
	);
	const reactDevToolVersion = require(path.resolve(
		reactDevToolPath,
		"manifest.json"
	)).version;
	logger.log(
		"[React开发插件加载]",
		"[版本:]",
		reactDevToolVersion,
		"[路径:]",
		reactDevToolPath
	);
	session.defaultSession.loadExtension(reactDevToolPath, {
		allowFileAccess: false,
	});
	*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 等待响应 app.on('ready', async () => {})
app.whenReady().then(() => {
	// create a browser object
	createWindow();
	// load extension for development
	loadExtension();
	// require("devtron").install();
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
