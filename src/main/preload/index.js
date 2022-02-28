// ---------------------------------------------------
// 第一阶段：在页面加载之前需要执行的相关代码
// ...
console.log("第一阶段：在页面加载之前需要执行的相关代码");

// -------------------------------------------------------
document.addEventListener("DOMNodeInserted", (event) => {
	// 第二阶段：页面内容加载之前需要引入的一些代码
	// ...
	console.log("第二阶段：页面内容加载之前需要引入的一些代码");
});

// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", (event) => {
	// 第三阶段：页面内容加载之后需要引入的一些操作
	// ...
	console.log("第三阶段：页面内容加载之后需要引入的一些操作");
});
// -------------------------------------------------------

console.log("preload init");
// 虽然我们只能引入一个preload.js，但是我们可以分割成多文件引入我们想要的代码
const { api2 } = require("./other.js");

window.api = function () {
	alert("api:say hello to BodomLake");
};
// 挂载在浏览器对象(window)上
window.api2 = api2;
// If your application's BrowserWindow was created with nodeIntegration set to false 
// then you will need to expose some globals via a preload script to allow Devtron access to Electron APIs:
// window.__devtron = { require: require, process: process };

/*
window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type]);
	}
});
*/
