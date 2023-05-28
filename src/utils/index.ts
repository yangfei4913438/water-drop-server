import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// 随机产生一个指定长度的数字字符串
export const randomCode = (length = 4) => {
  return Math.floor(Math.random() * 10000000000000000)
    .toString()
    .slice(-1 * length);
};

export const getDayjs = {
  dayjs,
  // 返回一个符合mysql时间戳格式的UTC时间字符串，同时声明为Date类型
  toUTCDate: () => dayjs.utc().format('YYYY-MM-DD HH:mm:ss') as unknown as Date,
  // 返回一个符合mysql时间戳格式的本地时间字符串，同时声明为Date类型
  toLocalDate: () => dayjs().format('YYYY-MM-DD HH:mm:ss') as unknown as Date,
};
