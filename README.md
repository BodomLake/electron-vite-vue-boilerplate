# [electron-vite-vue-boilerplate](https://github.com/BodomLake/electron-vite-vue-boilerplate.git)

- 一个基于 Vue渲染DOM + Vite构建&开发 + electron作运行时的中小型桌面软件的工程模板
    - 支持开发(dev)、调试(debugger)、打包(package)、联网在线更新（update online）
    - 本项目迭代会争取锁住所有主要依赖(package.json)的版本号
    - 本工程前卫地使用当下最新的技术栈和较新版本的js库
    - 项目结构规划了资源放置的结构和位置
    - 以自定义的脚本作工程研发主要的运作手法
    - 附带相关文档地址+中文翻译

## 相关技术栈（工具链）的npm仓库地址和文档地址

- [electron:API文档](https://www.electronjs.org/docs/latest/api/app)
- [electron:历史版本发布-博客日志](https://www.electronjs.org/blog)
- [electron-builder:API文档](https://www.electron.build/api/electron-builder)
- [Vite中文网:(开发/构建/预览)配置文档](https://vitejs.cn/config/)
- [Vite中文网:Vite周边插件相关](https://vitejs.cn/plugins/)
- [esbuild:API文档](https://esbuild.github.io/api/)
- [Rollup:配置选项列表文档](https://rollupjs.org/guide/en/#big-list-of-options)
- [Rollup:API文档](https://rollupjs.org/guide/en/#javascript-api)
- [Vue3:API](https://v3.cn.vuejs.org/api/)
- [Vue3:教程](https://v3.cn.vuejs.org/guide/introduction.html)

## 主进程技术栈： electron + electron-debug + electron-log + devtron

    "electron": "^17.0.0"
    "electron-builder": "^22.14.13"
    "electron-debug": "^3.2.0"

## 渲染进程技术栈： Vue 3.2 + Vite 2.8 + VueDevTools 6.0 + JSX

    "vue": "^3.2.25"
    "@vitejs/plugin-legacy": "^1.7.1"
    "@vitejs/plugin-vue": "^2.2.0"
    "@vitejs/plugin-vue-jsx": "^1.3.7"
    "vite-plugin-inspect": "^0.3.14"
    "@vue/compiler-sfc": "^3.2.31"
    "vite": "^2.8.0"

## 工程的打包与构建： electron-builder + esbuild

    "esbuild": "^0.14.23"
    "electron-log": "^4.4.6"
    "vite": "^2.8.0"

## 软件安装包的制作要领和提示

### Windows平台

- nsis脚本备注：

### macOS平台

- dmg
- mas
- pkg

### Linux平台

- snap配置

## 软件版本更新技术方案

- 官方推荐electron-updater更新
- 个人设计 update online
- 覆盖式重装

## 推荐IDE和插件

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
