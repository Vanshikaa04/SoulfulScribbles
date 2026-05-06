const backendurl = import.meta.env.VITE_backendurl;

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${backendurl}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  return res;
};