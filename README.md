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
- [rem 适配方案](#rem)
- [VantUI 组件按需加载](#vant)
- [Sass 全局样式](#sass)
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
