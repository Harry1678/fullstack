export function problem(status: number, title: string, detail?: string) {
  return {
    type: "about:blank",
    title,
    status,
    detail,
  };
}
