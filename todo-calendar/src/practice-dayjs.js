import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const runPracticeDayjs = () => {
  const hour = new Date().getHours();
  console.log('hour', hour);

  const now = dayjs("2022-11-04 16:01:30");
  console.log("===== Practice Dayjs =====");
  console.log(
    "1. set minute - hh",
    dayjs(now).set("minute", 5).format("YYYY.MM.DD hh:mm:ss a A")
  );
  console.log(
    "2. set minute - HH",
    dayjs(now).set("minute", 5).format("YYYY.MM.DD HH:mm:ss")
  );
  console.log(
    "3. set hour",
    dayjs(now).set("hour", 10).format("YYYY.MM.DD HH:mm:ss")
  );
  console.log("4. get year", dayjs(now).get("year"));
  console.log("5. get month", dayjs(now).get("month")); // 0~11(1월~12월)
  console.log("6. get date", dayjs(now).get("date"));
  console.log("7. get day", dayjs(now).get("day")); // 0:일 ~ 6:토 요일을 가져옴
  console.log("8. get second", dayjs(now).get("second"));
  console.log(
    "9. add hour",
    dayjs(now).add(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  );
  console.log(
    "10. subtract hour",
    dayjs(now).subtract(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  );
  console.log("11. startOf", dayjs(now).startOf("month").format("YYYY.MM.DD"));
  console.log("12. endOf", dayjs(now).endOf("month").format("YYYY.MM.DD"));
  const aDate = dayjs("2022-10-29 15:00:20");
  const bDate = dayjs("2022-10-29 16:00:00");
  console.log("13. isSame month", dayjs(aDate).isSame(bDate, "month"));
  console.log("14. isSame hour", dayjs(aDate).isSame(bDate, "hour"));
  console.log("15. isBefore", dayjs(aDate).isBefore(bDate));
  console.log("16. isBefore date", dayjs(aDate).isBefore(bDate, "date"));
  console.log("17. isAfter a,b", dayjs(aDate).isAfter(bDate));
  console.log("18. isAfter b,a", dayjs(bDate).isAfter(aDate));
  console.log("19. isSameOrBefore", dayjs(aDate).isSameOrBefore(bDate, "date"));
  console.log("20. isSameOrAfter", dayjs(aDate).isSameOrAfter(bDate, "date"));
  console.log(
    "21. isBetween",
    dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate)
  );
  console.log(
    "22. isBetween date",
    dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate, "date")
  );
  console.log("23. diff minute a,b", dayjs(aDate).diff(bDate, "minute"));
  console.log("24. diff minute b,a", dayjs(bDate).diff(aDate, "minute"));
};