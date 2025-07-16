export const formatDate = (date?: Date | string) => {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB").format(d);
};

export const getLocalDateStringg = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
};
