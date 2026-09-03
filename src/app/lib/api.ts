const API_ENDPOINT =
  process.env.NEXT_PUBLIC_ENDPOINT?.replace(/\/$/, "") || "http://localhost:8000";

export function apiUrl(path: string, url: string): string {
  return `${API_ENDPOINT}${path}?url=${encodeURIComponent(url)}`;
}

export async function fetchJson<T>(path: string, url: string): Promise<T> {
  const response = await fetch(apiUrl(path, url), {
    method: "GET",
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "detail" in payload
        ? String((payload as { detail: unknown }).detail)
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}
