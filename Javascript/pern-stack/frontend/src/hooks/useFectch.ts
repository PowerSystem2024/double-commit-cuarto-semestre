import { useCallback, useEffect, useState } from "react";

// Tipos del custom hook
type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T> | null;
  loading: boolean;
  error: Error | null;
}
// Props opcionales
interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers:
    | { "Content-Type": "application/json" }
    | { "Content-Type": "multipart/form-data" }
    | { "Content-Type": "image/*" };
  credentials?: "include" | "omit" | "same-origin" | RequestCredentials;
  body?: BodyInit | undefined;
  mode?: "cors" | "navigate" | "no-cors" | "same-origin" | RequestMode;
}

export const useFetch = <T>(
  url: string,
  options?: FetchOptions | RequestInit
): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const response = await fetch(url, { ...options, signal });
        const jsonData = await response.json();

        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);

        setData(jsonData);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error };
};
