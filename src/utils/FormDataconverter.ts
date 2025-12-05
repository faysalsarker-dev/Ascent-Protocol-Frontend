// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function toFormData(obj: Record<string, any>): FormData {
  const form = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (value instanceof File) {
      form.append(key, value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => form.append(`${key}[]`, v));
      return;
    }
    if (typeof value === "object") {
      form.append(key, JSON.stringify(value));

      return;
    }
     console.log(`FormData → ${key}:`, value);
    form.append(key, value);
  });

  return form;
}
