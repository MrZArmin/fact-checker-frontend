const publicConfigs = {
  // import from .env
  appTitle: import.meta.env.VITE_APP_HTML_TITLE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
}

export function useRuntimeConfig() {
  return publicConfigs
}
