export function problem(
  status: number,
  title: string,
  detail?: string,
  instance?: string
) {
  return {
    type: "about:blank",
    title,
    status,
    detail,
    instance,
  };
}
