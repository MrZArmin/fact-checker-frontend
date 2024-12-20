const publicConfigs = {
  // import from .env
  appTitle: import.meta.env.VITE_APP_HTML_TITLE,
  apiBaseUrl: "https://api.factchecker.hu",
}

export function useRuntimeConfig() {
  return publicConfigs
}
