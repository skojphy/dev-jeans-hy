/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="node" />

interface ImportMetaEnv {
  readonly VITE_APP_FIREBASE_KEY: string
  readonly VITE_APP_AUTH_DOMAIN: string
  readonly VITE_APP_PROJECT_ID: string
  readonly VITE_APP_STORAGE_BUCKET: string
  readonly VITE_APP_MESSAGING_SENDER_ID: string
  readonly VITE_APP_APP_ID: string
  readonly VITE_APP_MEASUREMENT_ID: string

  readonly VITE_APP_API_URL: string
  readonly VITE_APP_GOOGLE_CLIENT_ID: string
  readonly VITE_APP_S3_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
