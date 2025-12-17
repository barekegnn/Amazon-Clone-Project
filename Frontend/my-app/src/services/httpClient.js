const DEFAULT_TIMEOUT_MS = 30000;

// Thin fetch wrapper for external providers (e.g., fakestore, dummyjson).
// Centralizes base URL, headers, and error handling so higher layers stay focused on domain logic.
export const createHttpClient = ({ baseUrl }) => {
  if (!baseUrl) {
    throw new Error("createHttpClient: baseUrl is required");
  }

  const buildUrl = (path) => {
    const trimmedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${trimmedBase}/${trimmedPath}`;
  };

  const withTimeout = (promise, timeoutMs = DEFAULT_TIMEOUT_MS) => {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
      ),
    ]);
  };

  const request = async (path, options = {}) => {
    const url = buildUrl(path);

    const response = await withTimeout(
      fetch(url, {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers ?? {}),
        },
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      })
    );

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status} for ${url}`);
      error.status = response.status;
      throw error;
    }

    return response.json();
  };

  return {
    get: (path, options) => request(path, { ...options, method: "GET" }),
  };
};

// Dedicated catalog client; if you swap providers (fakestore, dummyjson, internal API),
// this is the only place that needs reconfiguration.
export const catalogHttpClient = createHttpClient({
  baseUrl: "https://fakestoreapi.com",
});
