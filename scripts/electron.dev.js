const electron = require("electron");
const proc = require("child_process");
const path = require("path");
const esbuild = require("esbuild");
// 入口文件
let entryFilePath = path.join(__dirname, "../src/main/index.js");
let preloadFilePath = path.join(__dirname, "../src/main/preload/index.js");
// 输出文件
let outfile = path.join(__dirname, "../release/bundled/entry.js");

// 用独立的 'esbuild' 构建主进程代码
function buildMain() {
	console.log("[构建主进程代码到]:", outfile);
	// esbuild同步构建
	esbuild.buildSync({
		// 入口文件
		entryPoints: [entryFilePath],
		// 构建目标文件
		outfile: outfile,
		// 不要压缩代码，可以方便debug；
		minify: false,
		bundle: true,
		// 目标平台是 nodejs环境
		platform: "node",
		sourcemap: true,
		// 唯独不需要打包 electron 模块
		external: ["electron"],
	});
	// let envScript = this.getEnvScript();
	// let js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`;
	// 写入文件的头部
	// fs.writeFileSync(outfile, js);
}

// buildMain();
console.log("===============================");
// 执行spawn,模仿electron/cli.js;
// createElectronProcess是electron进程
console.log("[开启主进程程序]:");

console.log("[指定入口文件]:", entryFilePath);
let createElectronProcess = proc.spawn(
	electron.toString(),
	// [path.join(process.cwd(), "./release/bundled/", "entry.js")],
	[entryFilePath],
	{ cwd: process.cwd() }
);

// 监听electron.exe进程终止的情况
createElectronProcess.on("close", () => {
	// TODO
	// 可以考虑通知：vite服务器执行关闭
	// this.server.close();
	process.exit();
});

// 监听electron.exe的控制台输出的信息
createElectronProcess.stdout.on("data", (data) => {
	// data = data.toStirng();
	console.log("info from electron.exe", data.toString());
});

// 监听electron.exe的控制台输出的错误
createElectronProcess.stderr.on("data", (err) => {
	// err = err.toStirng();
	console.warn("error from electron.exe", err);
});
