import { deleteCookie, getCookie, persistTokens } from '@/src/services/auth/tokenHandlers';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";
// const BACKEND_API_URL = "http://localhost:5000/api";
const MAX_AUTH_RETRY = 1;


type TokenEnvelope = {
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  data?: {
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  };
  accessToken?: string;
  refreshToken?: string;
};

const extractTokens = (payload: TokenEnvelope | null | undefined) => {
  if (!payload) return { accessToken: undefined, refreshToken: undefined };

  if (payload.tokens) {
    return {
      accessToken: payload.tokens.accessToken,
      refreshToken: payload.tokens.refreshToken,
    };
  }

  if (payload.data?.tokens) {
    return {
      accessToken: payload.data.tokens.accessToken,
      refreshToken: payload.data.tokens.refreshToken,
    };
  }

  return {
    accessToken: payload.accessToken ?? payload.data?.accessToken,
    refreshToken: payload.refreshToken ?? payload.data?.refreshToken,
  };
};

const normalizeHeaders = (headers?: HeadersInit): Record<string, string> => {
  if (!headers) return {};
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...headers };
};

const attachAuthHeader = async (headers?: HeadersInit) => {
  const accessToken = await getCookie("accessToken");
  const normalized = normalizeHeaders(headers);

  if (accessToken && !normalized.Authorization) {
    normalized.Authorization = `Bearer ${accessToken}`;
  }

  return normalized;
};

const refreshTokens = async () => {
  const refreshToken = await getCookie("refreshToken");

  if (!refreshToken) {
    return false;
  }

  const response = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    credentials: "include",  

  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    return false;
  }

  const { accessToken , refreshToken:newRefreshToken } = extractTokens(result);

  if (accessToken) {
await persistTokens(accessToken, newRefreshToken)
  }



  return true;
};

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit,
  attempt = 0,
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  console.log(BACKEND_API_URL,'BACKEND_API_URL');
  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {

   
     headers: {
      ... await attachAuthHeader(headers),
      Cookie: `accessToken=${accessToken}`,
    },
credentials: "include",  
    ...restOptions,
  });

  if (response.status === 401 && attempt < MAX_AUTH_RETRY) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return serverFetchHelper(endpoint, options, attempt + 1);
    }
  }

  return response;
};

export const dataFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};