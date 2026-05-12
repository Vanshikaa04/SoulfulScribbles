export const apiFetch = async (url, options = {}) => {
  const finalUrl = url.startsWith('http') ? url : `${import.meta.env.VITE_backendurl}${url}`;

  const headers = { ...options.headers };

  // 1. Only add JSON content-type if not sending a file
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(finalUrl, {
    ...options,
    headers,
    // 2. CRITICAL: This tells the browser to send the 'token' cookie automatically
    credentials: 'include', 
  });
};