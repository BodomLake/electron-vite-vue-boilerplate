"use strict";
const isDebug = false;
const builder = require("electron-builder");
const Platform = builder.Platform;
const Multispinner = require("multispinner");
// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
	protocols: {
		name: "Deeplink Example",
		// Don't forget to set `MimeType: "x-scheme-handler/deeplink"` for `linux.desktop` entry!
		schemes: ["deeplink"],
	},

	// "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
	compression: "store",
	removePackageScripts: true,

	nodeGypRebuild: false,
	buildDependenciesFromSource: false,
	appId: "org.bodomlake.demo",
	// ${productName}-${version}.${ext}
	artifactName: "",
	// 文件夹
	directories: {
		// output: "../electron-dist/artifacts/local",
		output: "./electron-dist",
		buildResources: "installer/resources",
	},
	files: ["out"],
	asar: false,
	// 指定未被asar处理的入口程序js文件
	asarUnpack: "../../src/main/main.js",
	/*
	extraFiles: [
		{
			from: "build/Release",
			to: nodeAddonDir,
			filter: "*.node",
		},
	],
	*/

	win: {
		target: "nsis",
	},
	nsis: {
		deleteAppDataOnUninstall: true,
		// include: "installer/win/nsis-installer.nsh",
	},

	mac: {
		target: "dmg",
		hardenedRuntime: true,
		gatekeeperAssess: true,
		extendInfo: {
			NSAppleEventsUsageDescription: "Let me use Apple Events.",
			NSCameraUsageDescription: "Let me use the camera.",
			NSScreenCaptureDescription: "Let me take screenshots.",
		},
	},
	dmg: {
		background: "installer/mac/dmg-background.png",
		iconSize: 100,
		contents: [
			{
				x: 255,
				y: 85,
				type: "file",
			},
			{
				x: 253,
				y: 325,
				type: "link",
				path: "/Applications",
			},
		],
		window: {
			width: 500,
			height: 500,
		},
	},

	linux: {
		desktop: {
			StartupNotify: "false",
			Encoding: "UTF-8",
			MimeType: "x-scheme-handler/deeplink",
		},
		target: ["AppImage", "rpm", "deb"],
	},
	deb: {
		priority: "optional",
		afterInstall: "installer/linux/after-install.tpl",
	},
	rpm: {
		fpm: ["--before-install", "installer/linux/before-install.tpl"],
		afterInstall: "installer/linux/after-install.tpl",
	},

	afterSign: async (context) => {
		// Mac releases require hardening+notarization: https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution
		if (!isDebug && context.electronPlatformName === "darwin") {
			await notarizeMac(context);
		}
	},
	artifactBuildStarted: (context) => {
		identifyLinuxPackage(context);
	},
	afterAllArtifactBuild: (buildResult) => {
		return stampArtifacts(buildResult);
	},
	// force arch build if using electron-rebuild
	/*
	beforeBuild: async (context) => {
		const { appDir, electronVersion, arch } = context;
		await electronRebuild.rebuild({ buildPath: appDir, electronVersion, arch });
		return false;
	},
	*/
};

// Promise is returned
builder
	.build({
		targets: Platform.WINDOWS.createTarget(),
		config: options,
	})
	.then((result) => {
		console.log(JSON.stringify(result));
	})
	.catch((error) => {
		console.error(error);
	});
