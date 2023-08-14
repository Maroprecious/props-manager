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

export const currencyFormat = (num: any) => {
  return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

let DECIMAL_SEPARATOR = '.';
let GROUP_SEPARATOR = ',';

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return x.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
};

export const formatNumber = (valString: any, mode = false) => {
  // return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
  if (!valString) {
    return '';
  }

  if (mode) {
    let val = valString.toString();
    const parts = unFormatNumber(val).split(DECIMAL_SEPARATOR);

    var res =
      parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, GROUP_SEPARATOR) +
      (!parts[1] ? '' : DECIMAL_SEPARATOR + parts[1]);

    return res;
  } else {
    let val = valString.toString();

    const parts = unFormatNumber(val).split(DECIMAL_SEPARATOR);

    var res =
      parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, GROUP_SEPARATOR) +
      (!parts[1] ? '' : DECIMAL_SEPARATOR + parts[1]);

    return res;
  }
};

export const unFormatNumber = (val: any) => {
  if (typeof val === 'number') {
    return val;
  }
  if (!val) {
    return '';
  }
  val = val.replace(/^0+/, '');

  if (GROUP_SEPARATOR === ',') {
    return val.replace(/,/g, '');
  } else {
    return val.replace(/\./g, '');
  }
};

export const splitPhoneNumber = (phone: string) => {
  const split = phone.split("(0)");
  return {
    code: split.length === 2 ? split[0] : "",
    phone: split.length === 2 ? split[1] : split[0]
  }
}

export const currencyToString = (num: string) => {
  const commaRegEx = new RegExp(',','g')
  const str = num.split('.')[0].replace(commaRegEx,"");
  console.log(str)
  return str !== "0" ? str : ""
}