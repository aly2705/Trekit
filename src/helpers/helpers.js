// formats yyyy-mm-dd
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
