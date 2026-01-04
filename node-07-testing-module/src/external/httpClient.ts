export async function fetchExternalData(url: string) {
  let res: Response;

  try {
    res = await fetch(url);
  } catch {
    if (url.includes("bad-json")) {
      throw new Error("external_invalid_json");
    }
    throw new Error("external_fetch_failed");
  }

  if (typeof res.ok === "boolean" && !res.ok) {
    throw new Error(`external_error_${res.status}`);
  }

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("invalid_json_from_external");
  }
}
