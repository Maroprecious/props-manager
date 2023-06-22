export function formatCurrency(num: number, toFixed: number = 2) {
  var p = num.toFixed(toFixed).split(".");
  return (
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export function formatCurrencyShort(n: number) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}

export function formatCurrencyNoDecimal(num: number) {
  var p = num.toString();
  return p
    .split("")
    .reverse()
    .reduce(function (acc, num, i, orig) {
      return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "");
}
