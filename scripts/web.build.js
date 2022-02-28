const path = require("path");
const vite = require("vite");
// 提供 Vue 3 单文件组件支持
let vue = require("@vitejs/plugin-vue");
// 提供 Vue 3 JSX 支持
let vueJsx = require("@vitejs/plugin-vue-jsx");

// 为打包后的文件提供传统浏览器兼容性支持
// let legacy = require("@vitejs/plugin-legacy");

let pathResolve = (relPath) => {
	return path.resolve(__dirname, relPath);
};
(async () => {
	await vite.build({
		root: pathResolve("../src/renderer/"),
		publicDir: "",
		base: "./",
		// 作为静态资源服务的文件夹
		publicDir: 'public',
		build: {
			outDir: pathResolve("../web-dist"),
			minify: "esbuild",
			// 启用/禁用 CSS 代码拆分。
			// 当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
			// 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
			cssCodeSplit: true,
			// 默认清空目的文件，重新来过
			emptyOutDir: true,
			// chunk 大小警告的限制（以 kbs 为单位）
			chunkSizeWarningLimit: 500,
			// 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
			// 如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。
			// 'hidden' 的工作原理与 'true' 相似，只是 bundle 文件中相应的注释将不被保留。
			sourcemap: false,
		},
		plugins: [
			// 指定vue库
			vue(),
			vueJsx({
				// options are passed on to @vue/babel-plugin-jsx
			}),
		],
	});
})();
