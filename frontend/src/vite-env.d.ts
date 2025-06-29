/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY_1?: string
  readonly VITE_GEMINI_API_KEY_2?: string
  readonly VITE_GEMINI_API_KEY_3?: string
  readonly VITE_GEMINI_API_KEY_4?: string
  readonly VITE_GEMINI_API_KEY_5?: string
  readonly VITE_GEMINI_API_KEY_6?: string
  readonly VITE_GEMINI_API_KEY_7?: string
  readonly VITE_GEMINI_API_KEY_8?: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
  readonly VITE_APP_ENV?: string
  readonly VITE_API_TIMEOUT?: string
  readonly VITE_API_RETRY_ATTEMPTS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
