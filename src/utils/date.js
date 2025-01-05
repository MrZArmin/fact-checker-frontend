export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isWithinLast7Days = (date) => {
  const last7Days = new Date().setDate(new Date().getDate() - 7);
  return date >= last7Days && !isToday(date);
};

export const isWithinLastMonth = (date) => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  return date >= lastMonth && !isWithinLast7Days(date) && !isToday(date);
};
