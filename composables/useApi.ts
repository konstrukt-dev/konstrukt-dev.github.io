export const useApi = <T>(endpoint: string, options = {}) => {
    const config = useRuntimeConfig();
    const url = `${config.public.apiBase}${endpoint}.json`;
   return useFetch<T>(url, options);
};