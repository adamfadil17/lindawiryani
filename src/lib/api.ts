import axiosBase from "axios";

/**
 * Shared axios instance for the admin UI (task 1.2).
 *
 * Session auth now rides on an HttpOnly cookie, so every request must send
 * credentials. The static helpers (`isAxiosError`, `isCancel`) are copied onto
 * the instance so pages can keep their existing `axios.isAxiosError(...)`
 * checks after switching the import to `@/lib/api`.
 */
const instance = axiosBase.create({
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const api = Object.assign(instance, {
  isAxiosError: axiosBase.isAxiosError,
  isCancel: axiosBase.isCancel,
});

export type ApiClient = typeof api;

export default api;
