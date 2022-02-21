const path = require("path");
const vite = require("vite");

(async () => {
	await vite.build({
		root: path.resolve(__dirname, "../src/renderer"),
		base: "/",
		build: {
			// rollupOptions: {
			// 	// ...
			// },
		},
	});
})();
