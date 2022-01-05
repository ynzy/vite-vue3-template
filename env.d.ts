/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: string // 环境
  readonly VITE_OUTPUT_DIR: string // 打包目录
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
