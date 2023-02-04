import dayjs from "dayjs";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";

export const StatusBarHeight = getStatusBarHeight(true);
export const bottomSpace = getBottomSpace();
export const ITEM_WIDTH = 220;


export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day"); //수요일 3
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }
  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day"); //화요일 2
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month"); //2.1
  const end = dayjs(now).endOf("month"); //2.28
  const endDate = dayjs(end).get("date"); //28

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

// @param day 0~6
// @return 일~월

const dayTexts = ["일","월","화","수","목","금","토"];
export const getDayText = (day) => {
    return dayTexts[day];

    // 또다른방법
    // switch(day){
    //     case 0: return '일';
    //     case 1: return '월';
    //     case 2: return '화';
    //     case 3: return '수';
    //     case 4: return '목';
    //     case 5: return '금';
    //     case 6: return '토';
    //     default: return '';
    // }
};

export const getDayColor = (day) => {
    // switch문으로도 작성가능
    return day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b'
};
