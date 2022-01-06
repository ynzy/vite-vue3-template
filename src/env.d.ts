/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /**
   * 环境
   */
  readonly VITE_ENV: string
  /**
   * 打包目录
   */
  readonly VITE_OUTPUT_DIR: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
