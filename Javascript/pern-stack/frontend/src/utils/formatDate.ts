export const formatDate = (str: Date | string) => {
  const date = new Date(str).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date;
};

export const formatDateAndTime = (str: Date | string) => {
    const date = new Date(str).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return date;
  };