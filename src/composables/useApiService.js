import { toast } from 'vue3-toastify';
import { useRuntimeConfig } from '@/composables/useRuntimeConfig';
import { useUserStore } from '@/stores/user';

import apiAuth from '@/api/auth';
import apiUser from '@/api/user';
import apiChat from '@/api/chat';

const request = (
  requestPath,
  method = 'GET',
  query = undefined,
  body = null,
  headers = {}
) => {
  let config = useRuntimeConfig();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const userStore = useUserStore();
  const bearerToken = userStore.theToken;
  if (bearerToken !== null && typeof bearerToken !== 'undefined') {
    defaultHeaders['Authorization'] = `Bearer ${bearerToken}`;
  }

  // Add query parameters to URL if they exist
  const url = new URL(`${config.apiBaseUrl}${requestPath}`);
  if (query) {
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );
  }

  return fetch(url, {
    method,
    body: body !== null ? JSON.stringify(body) : null,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials: 'include', // Add this to handle cookies
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw { status: response.status, data };
      }
      return data;
    })
    .catch((e) => {
      if (e.status === 401) {
        console.error('[API] Unauthorized', e.data);
        toast.error('Access Denied.');
        const userStore = useUserStore();
        userStore.logout();
        return e;
      }
      console.error('[API] Error', e);
      throw e;
    });
};

const apiRequests = {
  get: (requestPath, query = {}, headers = {}) =>
    request(requestPath, 'GET', query, null, headers),
  post: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'POST', query, body, headers),
  put: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'PUT', query, body, headers),
  delete: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'DELETE', query, body, headers),
};

const displayValidationErrors = (errorPayload) => {
  Object.keys(errorPayload).forEach((k) => {
    for (let errorItem of errorPayload[k]) {
      toast.warning(errorItem);
    }
  });
};

export const apiService = {
  displayValidationErrors,
  auth: apiAuth(apiRequests),
  user: apiUser(apiRequests),
  chat: apiChat(apiRequests),
};
