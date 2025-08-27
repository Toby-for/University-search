export function formatCurrency(amount, currency) {
  if (amount === null || amount === undefined) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    return amount.toString();
  }
}

export function parseISODate(str) {
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

export function compareBy(...props) {
  return (a, b) => {
    for (const prop of props) {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
    }
    return 0;
  };
}

export function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
