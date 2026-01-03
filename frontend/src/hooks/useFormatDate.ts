export const formatDate = (input: string | Date | undefined): string => {
  if (!input) return "";
  if (input instanceof Date) {
    const day = String(input.getUTCDate()).padStart(2, "0");
    const month = String(input.getUTCMonth() + 1).padStart(2, "0");
    const year = input.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  const iso = String(input);
  const datePart = iso.split("T")[0];
  const [y, m, d] = datePart.split("-");
  if (y && m && d) return `${d}/${m}/${y}`;
  const dt = new Date(iso);
  if (!isNaN(dt.getTime())) {
    const day = String(dt.getUTCDate()).padStart(2, "0");
    const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const year = dt.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  return iso;
};

export const formatDateToISO = (date: string | null) => {
  if (!date) return null;
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};
