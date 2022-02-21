let vite = require("vite");
let path = require("path");

// 提供 Vue 3 单文件组件支持
let vue = require("@vitejs/plugin-vue");
// 提供 Vue 3 JSX 支持
let vueJsx = require("@vitejs/plugin-vue-jsx");
// 为打包后的文件提供传统浏览器兼容性支持
let legacy = require("@vitejs/plugin-legacy");
let PluginInspect = require("vite-plugin-inspect");


console.log("当前目录 ==> ", __dirname);
// 一个处理相对路径的简写方法
let pathResolve = (relPath) => {
	return path.resolve(__dirname, relPath);
};
let viteConfig = {
	// 任何合法的用户配置选项，加上 `mode` 和 `configFile`
	root: pathResolve("../src/renderer/"),
	// configFile 指明要使用的配置文件。如果没有设置，Vite 将尝试从项目根目录自动解析。设置为 false 可以禁用自动解析功能。
	configFile: false,
	//envFile：设置为 false 时，则禁用 .env 文件。
	envFile: false,
	// vite放置缓存的路径（默认在放在 node_modules/.vite文件夹中）
	cacheDir: pathResolve("../node_modules/.vite"),
	// mode: "development" || "production",
	server: {
		port: 3060,
		// 打开指定的页面
		open: pathResolve("../src/renderer/index.html"),
		// 代理配置
		proxy: {},
		// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
		host: true,
		// 默认尝试指定端口端口之外的其他端口
		strictPort: false,
	},
	plugins: [
		// 指定vue库
		vue(),
		legacy({
			targets: ["defaults", "not IE 11"],
		}),
		vueJsx({
			// options are passed on to @vue/babel-plugin-jsx
		}),
		PluginInspect(),
	],
};
let dev = {
	server: null,
	// 创建(Vite)HTTP服务器
	async createServer() {
		await vite.createServer(viteConfig);
		// 启动vite服务器
		this.server = await vite.createServer(viteConfig);
		// 开启监听服务
		await this.server.listen();
		// 打印url
		this.server.printUrls();
	},
	// 异步启动服务器
	async start() {
		await this.createServer();
	},
	async shutdown() {
		await this.server.close();
	},

};
// 启动vite作为web端的开发服务器
console.log("[启动vite作为web端的开发服务器]");
dev.start();
// 关闭
// dev.shutdown();
