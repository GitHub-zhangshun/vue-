/*
 * 格式化的方法，在这里全局定义。
 * 使用：不要在页面中调用方法去格式化数据。在这里说明过滤，在模板中以 {{ data | filter }} 的方式过滤。
 * 这样过滤的方法，使得数据更干净。
*/
import dayjs from "dayjs";
/**
 * 格式化时间戳（秒|毫秒）
 * @param {timestamp} value
 */
const timeFilter = value => {
  value = value.toString();
  if (value) {
    if (value.length === 13) {
      return dayjs(Number(value)).format("YYYY-MM-DD HH:mm:ss");
    }
    return dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return "-";
  }
}
/**
 * 手机号格式化
 * @param {String} phone
 */
const formatPhone = phone => {
  phone = phone.toString();
  return phone.substr(0, 3) + "****" + phone.substr(7, 11);
}
/**
 * 4位一空格（格式化银行卡）
 * @param {String} val
 */
const formatBank = val => {
  if (val) {
    return val
      .toString()
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");
  }
}
/**
 * 千分位格式化
 * @param {数字} val
 */
const toThousands = val => {
  let num = (val || 0).toString(),
    result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}
/**
 * 格式化小数位
 * @param val 传入的值
 * @param pos 保留的小数位
 * @returns {*}
 */
const formatFloat = (val, pos = 2) => {
  let f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(val * Math.pow(10, pos)) / Math.pow(10, pos); // pow 幂
  let s = f.toString();
  let rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + pos) {
    s += "0";
  }
  return s;
}
/**
 * 去掉小数点（配合格式化小数使用）。
 * @param val
 * @return {String}
 */
const delDot = val => {
  if(typeof val !== String) {
    val = String(val);
  }
  return val.slice(0, val.length-1);
}
/**
 * 格式化时长
 * @param second
 * @returns {string}
 */
const realFormatSecond = second => {
  let secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    let hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    let mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}

export default {
  timeFilter,
  formatPhone,
  formatBank,
  toThousands,
  formatFloat,
  delDot,
  realFormatSecond
}
