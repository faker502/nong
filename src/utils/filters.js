/**
 * 金额转换（分->元）
 * 100 => 1
 * @param {number} num
 */
export function moneyFormatter(num) {
  return isNaN(num) ? 0.0 : parseFloat((num / 100).toFixed(2));
}

/**
 * 银行卡 *
 * @param {} str
 * @returns
 */
export const filterBank = (str) => {
  if (!str) return "";
  return str.replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2");
};

/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @param location
 * @returns {*}
 */
export function unitPrice(val, unit, location) {
  const price = formatPrice(val);
  if (location === "before") {
    return price.substr(0, price.length - 3);
  }
  if (location === "after") {
    return price.substr(-2);
  }
  return (unit || "") + price;
}

/**
 * 货币格式化
 * @param price
 * @returns {string}
 */
export function formatPrice(price) {
  if (typeof price !== "number") return price;
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 通用脱敏方法
 */
export function desensitization(str, beginLen, endLen) {
  let len = str.length;
  let firstStr = str.substr(0, beginLen);
  let lastStr = str.substr(endLen);
  let middleStr = str
    .substring(beginLen, len - Math.abs(endLen))
    .replace(/[\s\S]/gi, "*");
  let tempStr = firstStr + middleStr + lastStr;
  return tempStr;
}

export function formatName(str) {
  return new Array(str.length).join("*") + str.substr(-1);
}

export function formatPhone(number) {
  if (!number) return "";
  let pat = /(\d{3})\d*(\d{4})/;
  let result = number.replace(pat, "$1****$2");
  return result;
}

export function bigNumberTransform(value) {
  const newValue = ["", "", ""];
  let fr = 1000;
  let num = 3;
  let text1 = "";
  let fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
  }
  if (num <= 4) {
    // 千
    newValue[0] = parseInt(value / 1000) + "";
    newValue[1] = "千";
  } else if (num <= 8) {
    // 万
    text1 = parseInt(num - 4) / 3 > 1 ? "千万" : "万";
    fm = text1 === "万" ? 10000 : 10000000;
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + "";
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + "";
    }
    newValue[1] = text1;
  } else if (num <= 16) {
    // 亿
    text1 = (num - 8) / 3 > 1 ? "千亿" : "亿";
    text1 = (num - 8) / 4 > 1 ? "万亿" : text1;
    text1 = (num - 8) / 7 > 1 ? "千万亿" : text1;
    fm = 1;
    if (text1 === "亿") {
      fm = 100000000;
    } else if (text1 === "千亿") {
      fm = 100000000000;
    } else if (text1 === "万亿") {
      fm = 1000000000000;
    } else if (text1 === "千万亿") {
      fm = 1000000000000000;
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + "";
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + "";
    }
    newValue[1] = text1;
  }
  if (value < 1000) {
    newValue[0] = value + "";
    newValue[1] = "";
  }
  return newValue.join("");
}
