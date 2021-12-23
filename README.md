# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## <span id="top">目录</span>

- [√ 配置多环境变量](#env)
- [√ 集成 Tsx](#env)
- [rem 适配方案](#rem)
- [VantUI 组件按需加载](#vant)
- [Sass 全局样式](#sass)
- [适配苹果底部安全距离](#phonex)
- [使用 Mock 数据](#mock)
- [Axios 封装及接口管理](#axios)
- [Vuex 状态管理](#vuex)
- [Vue-router](#router)
- [ 配置 alias 别名](#alias)
- [ 配置 proxy 跨域](#proxy)
- [vconsole 移动端调试](#vconsole)
- [ 动态设置 title](#dyntitle)
- [ 本地存储 storage 封装](#storage)
- [ 配置 Jssdk](#jssdk)
- [√Eslint + Pettier 统一开发规范](#pettier)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
