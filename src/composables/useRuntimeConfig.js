const publicConfigs = {
  // import from .env
  appTitle: import.meta.env.VITE_APP_HTML_TITLE,
  apiBaseUrl: "https://api.factchecker.hu/",
  //apiBaseUrl: "http://127.0.0.1:8000/"
}

export function useRuntimeConfig() {
  return publicConfigs
}
