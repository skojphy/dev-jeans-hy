/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_FIREBASE_KEY: string
  readonly VITE_APP_AUTH_DOMAIN: string
  readonly VITE_APP_PROJECT_ID: string
  readonly VITE_APP_STORAGE_BUCKET: string
  readonly VITE_APP_MESSAGING_SENDER_ID: string
  readonly VITE_APP_APP_ID: string
  readonly VITE_APP_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
