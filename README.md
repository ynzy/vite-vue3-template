# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# <span id="top">目录</span>

- [√ 配置 ip 访问项目](#ip)
- [√ 配置多环境变量](#env)
- [√ 集成 Tsx](#tsx)
- [√ 配置 alias 别名](#alias)
- [√ Sass 全局样式](#sass)
- [√ 识别 nodejs 内置模块](#node)
- [√ 静态资源使用](#static)
- [rem 适配方案](#rem)
- [VantUI 组件按需加载](#vant)
- [适配苹果底部安全距离](#phonex)
- [使用 Mock 数据](#mock)
- [Axios 封装及接口管理](#axios)
- [Vuex 状态管理](#vuex)
- [Vue-router](#router)
- [ 配置 proxy 跨域](#proxy)
- [vconsole 移动端调试](#vconsole)
- [ 动态设置 title](#dyntitle)
- [ 本地存储 storage 封装](#storage)
- [ 配置 Jssdk](#jssdk)
- [Eslint + Pettier 统一开发规范](#pettier)

## <span id="env">✅ 配置 ip 访问项目 </span>

- vite 启动后出现 “ Network: use --host to expose ”

```js
vite v2.3.7 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose
```

- 是因为 IP 没有做配置，所以不能从 IP 启动，需要在 vite.config.js 做相应配置：
  在 vite.config.js 中添加 server.host 为 0.0.0.0

```js
export default defineConfig({
  plugins: [vue()],
  // 在文件中添加以下内容
  server: {
    host: "0.0.0.0",
  },
});
```

- 重新启动后显示

```js
vite v2.3.7 dev server running at:

  > Local:    http://localhost:3000/
  > Network:  http://192.168.199.127:3000/
```

## <span id="env">✅ 配置多环境变量 </span>

- 文档：https://cn.vitejs.dev/guide/env-and-mode.html

* 在生产环境，会把 import.meta.env 的值转换成对应真正的值

1. 添加环境变量文件，每个文件写入配置，**定义 env 环境变量前面必须加 VITE\_**

- `.env.development`

```js
# must start with VITE_
VITE_ENV = 'development'
VITE_OUTPUT_DIR = 'dev'
```

- `.env.production`

```js
# must start with VITE_
VITE_ENV = 'production'
VITE_OUTPUT_DIR = 'dist'
```

- `.env.test`

```js
# must start with VITE_
VITE_ENV = 'test'
VITE_OUTPUT_DIR = 'test'
```

2. 修改 scripts 命令

- `--mode` 用来识别我们的环境

```js
"dev": "vite --mode development",
"test": "vite --mode test",
"prod": "vite --mode production",
```

3. 在项目中访问

```js
console.log(import.meta.env);
```

4. typescript 智能提示

- 修改 `src/env.d.ts` 文件，如果没有创建一个

```js
/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: string; // 环境
  readonly VITE_OUTPUT_DIR: string; // 打包目录
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## <span id="tsx">✅ 集成 Tsx </span>

- 文档：https://cn.vitejs.dev/guide/features.html#jsx

1. 安装依赖

```js
pnpm i -D @vitejs/plugin-vue-jsx
```

2. 修改 vite.config.ts 配置

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      include: /\.(jsx|tsx)/,
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
});
```

## <span id="alias">✅ 配置 alias 别名 </span>

- 文档：https://cn.vitejs.dev/config/#resolve-alias
- 修改 vite.config.ts 配置

```js
  resolve: {
    alias: {
      "@": "/src",
    },
  },
```

## <span id="sass">✅ Sass 全局样式 </span>

- 文档：https://cn.vitejs.dev/guide/features.html#css-pre-processors

1. 安装依赖
   使用`dart-sass`, 安装速度比较快，大概率不会出现安装不成功

```js
pnpm i -D sass
```

2. 使用
   每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。

```html
<style lang="scss">
  /* global styles */
</style>

<style lang="scss" scoped>
  /* local styles */
</style>
```

### css modules

- 目前测试只有在 tsx 中可以正常使用，vue-template 中可以导入在 js 中使用，`<template>` 中还不知道怎么使用
- 定义一个 `*.module.scss` 或者 `*.module.css` 文件
- 在 tsx 中使用

```js
import { defineComponent } from "vue";
import classes from "@/styles/test.module.scss";
export default defineComponent({
  setup() {
    console.log(classes);
    return () => {
      return <div class={`root  ${classes.moduleClass}`}>测试css-modules</div>;
    };
  },
});
```

### vite 识别 sass 全局变量

- 文档：https://cn.vitejs.dev/config/#css-preprocessoroptions

* vite.config.js 添加配置

```js
css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/mixin.scss";
          @import "@/styles/variables.scss";
          `,
      },
    },
  },
```

## <span id="node">✅ 识别 nodejs 内置模块 </span>

- path 模块是 node.js 内置的功能，但是 node.js 本身并不支持 typescript，所以直接在 typescript 项目里使用是不行的
- 解决方法：安装@types/node

```js
pnpn i -D @types/node
```

- 在 vite.config.js 中使用

```js
import { resolve } from "path";
```

## <span id="static">✅ 静态资源使用 </span>

- 文档：https://cn.vitejs.dev/guide/features.html#static-assets

```js
// staticTest.vue
import img from "@/assets/images/图片.jpg"; // 返回图片资源路径
import demo from "./demo.tsx?url"; // 显式加载资源为一个 URL
import test from "@/test/test?raw"; // 以字符串形式加载资源
import Worker from "@/test/worker?worker"; // 如果是计算量很大的代码，可以使用 worker ，开启新的线程加载，与主线程通信
import jsonText from "@/test/jsonText.json"; // 读取 json 文件
console.log("静态图片--", img);
console.log("显式加载资源的url--", demo);
console.log("以字符串形式加载资源--", `类型${typeof test}`, test);
console.log("读取json--", jsonText);

const worker = new Worker();
worker.onmessage = function (e) {
  console.log("worker监听---", e);
};
```

### 动态引入图片

- 参考链接：https://juejin.cn/post/7030698018609315871

- 使用`new URL` 和 `import.meta.url`时的问题
- `import.meta.url` 获取到的是当前页面完整 url 地址，但是使用 `new URL` 拼接时，是当前调用时的路径拼接对应的参数
- 比如：

```js
// src/components/HelloWorld.vue
new URL("assets/images/年终总结.png", import.meta.url).href;
// import.meta.url 获取到的地址：http://192.168.124.4:3000/src/components/HelloWorld.vue?t=1641037446646
// 拼接后的地址：http://192.168.124.4:3000/src/components/assets/images/%E5%B9%B4%E7%BB%88%E6%80%BB%E7%BB%93.pn
```

- 折中方案：使用 `new URL` + `location.href`

```js
export const getImage = (name: string): string => {
  return new URL(`/src/assets/images/${name}.png`, location.href).href;
};
```

## <span id="static">✅ 静态资源使用 </span>
