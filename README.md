# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
## 项目启动
* 项目采用 pnpm 包管理器,如果没有请先安装 pnpm
```js
npm i -g pnpm // 全局安装 pnpm
pnpm install // 安装依赖
pnpm dev // 开发
pnpm build // 打包
pnpm preview
```

# <span id="top">目录</span>

- [√ 配置 ip 访问项目](#ip)
- [√ 配置多环境变量](#env)
- [√ 集成 Tsx](#tsx)
- [√ 配置 alias 别名](#alias)
- [√ Sass 全局样式](#sass)
- [√ 识别 nodejs 内置模块](#node)
- [√ 静态资源使用](#static)
- [√ Vue-router](#router)
- [√ Pinia 状态管理](#pinia)
- [√ Eslint + Prettier 统一开发规范](#prettier)
- [√ husky + lint-staged 提交校验](#husky)
- [√ 使用 Mock 数据](#mock)
- [Axios 封装及接口管理](#axios)
- [rem 适配方案](#rem)
- [VantUI 组件按需加载](#vant)
- [适配苹果底部安全距离](#phonex)
- [ 配置 proxy 跨域](#proxy)
- [vconsole 移动端调试](#vconsole)
- [ 动态设置 title](#dyntitle)
- [ 配置 Jssdk](#jssdk)

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
    host: '0.0.0.0'
  }
})
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
console.log(import.meta.env)
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
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      include: /\.(jsx|tsx)/
    })
  ],
  server: {
    host: '0.0.0.0'
  }
})
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
import { defineComponent } from 'vue'
import classes from '@/styles/test.module.scss'
export default defineComponent({
  setup() {
    console.log(classes)
    return () => {
      return <div class={`root  ${classes.moduleClass}`}>测试css-modules</div>
    }
  }
})
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
import { resolve } from 'path'
```

## <span id="static">✅ 静态资源使用 </span>

- 文档：https://cn.vitejs.dev/guide/features.html#static-assets

```js
// staticTest.vue
import img from '@/assets/images/图片.jpg' // 返回图片资源路径
import demo from './demo.tsx?url' // 显式加载资源为一个 URL
import test from '@/test/test?raw' // 以字符串形式加载资源
import Worker from '@/test/worker?worker' // 如果是计算量很大的代码，可以使用 worker ，开启新的线程加载，与主线程通信
import jsonText from '@/test/jsonText.json' // 读取 json 文件
console.log('静态图片--', img)
console.log('显式加载资源的url--', demo)
console.log('以字符串形式加载资源--', `类型${typeof test}`, test)
console.log('读取json--', jsonText)

const worker = new Worker()
worker.onmessage = function (e) {
  console.log('worker监听---', e)
}
```

### 动态引入图片

- 文档：https://cn.vitejs.dev/guide/assets.html#the-public-directory
- 参考链接：https://juejin.cn/post/7030698018609315871

- 使用`new URL` 和 `import.meta.url`时的问题
  - `import.meta.url` 获取到的是当前页面完整 url 地址
  - `new URL` 中必须填写**相对路径**
  - 打包不支持中文路径，暂时没解决`[vite:asset-import-meta-url] ENOENT: no such file or directory, open '/Users/zhangyong/code/oneself/template/vite-vue3-h5-template/src/assets/images/png/\u5E74\u7EC8\u603B\u7ED3.png'`

```js
// src/components/HelloWorld.vue
new URL('../assets/images/png/year.png', import.meta.url).href
// import.meta.url 获取到的地址：http://192.168.124.4:3000/src/components/HelloWorld.vue?t=1641037446646
// 拼接后的地址：http://192.168.124.4:3000/src/assets/images/png/%E5%B9%B4%E7%BB%88%E6%80%BB%E7%BB%93.png
```

## <span id="router">✅ Vue-router4 </span>

- 文档：https://next.router.vuejs.org/zh/installation.html
- composition-api 使用：https://next.router.vuejs.org/zh/guide/advanced/composition-api.html

### 1. 安装依赖

```ts
pnpm install vue-router@4
```

### 2. 配置路由 api

- 在 src 目录下，新建 router 文件夹，并在文件夹内创建
  - index.ts 管理路由 api
  - router.config.ts 管理路由信息

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router.config'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```ts
// router/router.config.ts
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    component: import('@/views/layouts/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: import('@/views/home.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true }
      }
    ]
  }
]
```

### 3. mian 中引入 router

```ts
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 4. app.vue 和 layout 配置 router-view

```ts
// app.vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
console.log('查看全局环境',import.meta.env);
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

```ts
// layouts/index.vue
<script setup lang='ts'>
import { useRoute } from 'vue-router';

    const route = useRoute()
    console.log(route.meta);

</script>
<template>
    <div class="layout-content">
        <keep-alive v-if="route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
    </div>
</template>
<style lang='scss' scoped>

</style>
```

## <span id="pinia">✅ Pinia 状态管理 </span>

- 文档：https://pinia.vuejs.org/
- 参考资料：https://juejin.cn/post/7049196967770980389
- Pinia 的特点：
  - 完整的 typescript 的支持；
  - 足够轻量，压缩后的体积只有 1.6kb;
  - 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
  - actions 支持同步和异步；
  - 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
  - 无需手动添加 store，store 一旦创建便会自动添加；

### 安装依赖

```js
pnpm i pinia
```

### 创建 Store

- 新建 src/store 目录并在其下面创建 index.ts，导出 store

```js
// src/store/index.ts

import { createPinia } from 'pinia'

const store = createPinia()

export default store
```

### 在 main.ts 中引入并使用

```ts
// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
```

### 定义 State

- 在 src/store 下面创建一个 user.ts

```ts
//src/store/user.ts

import { defineStore } from 'pinia'
import { useAppStore } from './app'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰'
    }
  },
  actions: {
    updateState(data: any) {
      this.$state = data
      this.updateAppConfig()
    },
    updateAppConfig() {
      const appStore = useAppStore()
      appStore.setData('app-update')
    }
  }
})
```

```ts
//src/store/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      config: 'app'
    }
  },
  actions: {
    setData(data: any) {
      console.log(data)
      this.config = data
    }
  }
})
```

### 获取/更新 State

```vue
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const userStore = useUserStore()
const appStore = useAppStore()
console.log(appStore.config)
console.log(userStore)
console.log(userStore.name)
const name = computed(() => userStore.name)
const { age } = storeToRefs(userStore)

const updateUserState = () => {
  const { name, age } = userStore.$state
  userStore.updateState({
    name: name + 1,
    age: age + 1
  })
}
</script>
<template>
  <div>姓名：{{ name }}</div>
  <div>年龄：{{ age }}</div>
  <div>计算的名字：{{ userStore.fullName }}</div>
  <div>app的config: {{ appStore.config }}</div>
  <button @click="updateUserState">更新数据</button>
</template>

<style lang="scss" scoped></style>
```

### 数据持久化

- 文档：https://github.com/prazdevs/pinia-plugin-persistedstate

* 插件 pinia-plugin-persistedstate 可以辅助实现数据持久化功能。
* 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。

* 安装依赖

```ts
pnpm i pinia-plugin-persistedstate
```

- 引用插件

```ts
// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
```

- 在对应的 store 里开启 persist 即可

```ts
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },

  // 开启数据缓存
  persist: {
    key: 'user',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['name'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
    overwrite: true
  }
})
```

## <span id="prettier">✅ Eslint + Prettier 统一开发规范 </span>

### 1. 安装依赖

```js
pnpm i -D eslint eslint-plugin-vue prettier @vue/eslint-config-prettier @vue/eslint-config-typescript @rushstack/eslint-patch
```

### 2. 编写相关文件

- .eslintrc.js

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
```

- .prettierc.js

```js
module.exports = {
  // 定制格式化要求
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ],
  printWidth: 100, // 一行最多 100 字符
  tabWidth: 2, // 使用 4 个空格缩进
  semi: false, // 行尾需要有分号
  singleQuote: true, // 使用单引号而不是双引号
  useTabs: false, // 用制表符而不是空格缩进行
  quoteProps: 'as-needed', // 仅在需要时在对象属性两边添加引号
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  trailingComma: 'none', // 末尾不需要逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素反尖括号需要换行
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号 avoid
  rangeStart: 0, // 每个文件格式化的范围是开头-结束
  rangeEnd: Infinity, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准 always
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  vueIndentScriptAndStyle: false, //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  endOfLine: 'lf', // 换行符使用 lf 在Linux和macOS以及git存储库内部通用\n
  embeddedLanguageFormatting: 'auto' //（默认值）允许自动格式化内嵌的代码块
}
```

- .vscode/settings.json

```js
{
    "editor.formatOnSave": false, // 每次保存的时候自动格式化
    "editor.formatOnPaste": true, // 自动格式化粘贴内容
    "editor.tabCompletion": "on", // tab 自动补全
    "editor.codeActionsOnSave": { // 保存时使用 ESLint 修复可修复错误
        "source.fixAll": true,
        "source.fixAll.eslint": true, // 保存时使用 ESLint 修复可修复错误
        // "source.fixAll.stylelint": true
    },
    // 文件设置
    "files.eol": "\n", // 默认行尾字符。 git全局配置 git config --global core.autocrlf false
    // eslint 设置
    "eslint.alwaysShowStatus": true, // 总是在 VSCode 显示 ESLint 的状态
    "eslint.probe": [ // eslint 校验的语言类型 - 新版
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue",
        "markdown",
        "tsx"
    ],
}
```

## <span id="husky">✅ husky + lint-staged 提交校验 </span>

### 1. 安装依赖

```js
pnpm i -D husky lint-staged
```

### 2. 添加脚本命令

```js
npm set-script prepare "husky install"  // 在 package.json/scripts 中添加 "prepare": "husky install" 命令， 这个命令只在linux/uinx系统有效，win系统可以直接在scripts中添加命令
npm run prepare  //  初始化husky,将 git hooks 钩子交由,husky执行， 会在根目录创建 .husky 文件夹
npx husky add .husky/pre-commit "npx lint-staged" // pre-commit 执行 npx lint-staged 指令
```

### 3. 创建 .lintstagedrc.json

```json
{
  "**/*.{js,ts,tsx,jsx,vue,scss,css}": [
    "prettier --write \"src/**/*.ts\" \"src/**/*.vue\"",
    "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
  ]
}
```

## <span id="mock">✅ 使用 Mock 数据 </span>

- 文档：https://github.com/vbenjs/vite-plugin-mock
- mock 数据目前测试，在开发环境 XHR 和 fetch 都生效，生产环境只能使用 XHR 类型请求库调用，fetch 不生效

### 1. 安装依赖

```js
pnpm i -D vite-plugin-mock
# 如果不使用mockjs,则不需要安装 mockjs 相关依赖
pnpm i mockjs
pnpm i -D @types/mockjs
```

### 2. 生产环境 相关封装

```ts
// mock/_createProductionServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.globEager('./**/*.ts')

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...modules[key].default)
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
```

```ts
// mock/_util.ts
// Interface data format used to return a unified format

import { Recordable } from 'vite-plugin-mock'

export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success'
  }
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {}
) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length
    }),
    message
  }
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error'
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}
```

```ts
// mock/sys/user
import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export default [
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      console.log('----请求了getUserInfo---')

      return resultSuccess({
        name: '章三',
        age: 40,
        sex: '男'
      })
    }
  }
] as MockMethod[]
```

### 3. 修改 vite.config.ts 配置

```ts
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  return defineConfig({
    plugins: [
      viteMockServe({
        ignore: /^_/, // 正则匹配忽略的文件
        mockPath: 'mock', // 设置mock.ts 文件的存储文件夹
        localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: true, // 设置生产环境是否启用 mock 功能
        watchFiles: true, // 设置是否监视mockPath对应的文件夹内文件中的更改
        // 代码注入
        injectCode: ` 
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `
      })
    ]
  })
}
```
