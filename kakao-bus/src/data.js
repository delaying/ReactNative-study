import dayjs from "dayjs";
import { COLOR } from "./color";

export const busStop = {
  id: 23284,
  name: "강남역12번출구",
  directionDescription: "강남역.강남역사거리",
  isBookmarked: true,
  //   type은 B는 blue이고 간선버스, G는 green이고 지선버스, R은 red이고 직행버스를 의미
  buses: [
    {
      type: "B",
      num: 146,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(8, "minute"),
          numOfRemainedStops: 5,
          numOfPassengers: 3,
        },
        {
          arrivalTime: dayjs().add(21, "minute").add(3, "second"),
          numOfRemainedStops: 11,
          numOfPassengers: 5,
        },
      ],
    },
    {
      type: "B",
      num: 360,
      directionDescription: "지하철2호선강남역",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(50, "second"),
          numOfRemainedStops: 1,
          numOfPassengers: 32,
        },
        {
          arrivalTime: dayjs().add(10, "minute").add(30, "second"),
          numOfRemainedStops: 6,
          numOfPassengers: 25,
        },
      ],
    },
    {
      type: "B",
      num: 740,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(1, "minute").add(5, "second"),
          numOfRemainedStops: 1,
          numOfPassengers: 22,
        },
        {
          arrivalTime: dayjs().add(14, "minute"),
          numOfRemainedStops: 5,
          numOfPassengers: 8,
        },
      ],
    },
    {
      type: "G",
      num: 3412,
      directionDescription: "강남역",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(5, "minute").add(10, "second"),
          numOfRemainedStops: 4,
          numOfPassengers: 8,
        },
        {
          arrivalTime: dayjs().add(18, "minute").add(14, "second"),
          numOfRemainedStops: 18,
          numOfPassengers: 16,
        },
      ],
    },
    {
      type: "R",
      num: 1100,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(70, "minute"),
          numOfRemainedStops: 42,
          numOfPassengers: 3,
        },
      ],
    },
    {
      type: "R",
      num: 1700,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(12, "minute"),
          numOfRemainedStops: 7,
          numOfPassengers: 39,
        },
        {
          arrivalTime: dayjs().add(44, "minute").add(10, "second"),
          numOfRemainedStops: 22,
          numOfPassengers: 4,
        },
      ],
    },
    {
      type: "R",
      num: 2000,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [],
    },
    {
      type: "R",
      num: 3600,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(11, "minute").add(44, "second"),
          numOfRemainedStops: 6,
          numOfPassengers: 11,
        },
        {
          arrivalTime: dayjs().add(39, "minute").add(42, "second"),
          numOfRemainedStops: 14,
          numOfPassengers: 10,
        },
      ],
    },
    {
      type: "R",
      num: 7007,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(9, "minute").add(23, "second"),
          numOfRemainedStops: 5,
          numOfPassengers: 2,
        },
        {
          arrivalTime: dayjs().add(24, "minute").add(50, "second"),
          numOfRemainedStops: 12,
          numOfPassengers: 2,
          numOfPassengers: 7,
        },
      ],
    },
    {
      type: "R",
      num: 8001,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, "minute").add(48, "second"),
          numOfRemainedStops: 10,
          numOfPassengers: 3,
        },
      ],
    },
    {
      type: "R",
      num: 9303,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, "minute").add(48, "second"),
          numOfRemainedStops: 10,
          numOfPassengers: 20,
        },
      ],
    },
    {
      type: "R",
      num: 9600,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(28, "minute").add(7, "second"),
          numOfRemainedStops: 16,
          numOfPassengers: 6,
        },
      ],
    },
  ],
};

export const getSections = (buses) => {
  const bBuses = []; // data
  const gBuses = []; // data
  const rBuses = []; // data

  for (const bus of buses) {
    if (bus.type === "B") bBuses.push(bus);
    else if (bus.type === "G") gBuses.push(bus);
    else if (bus.type === "R") rBuses.push(bus);
  }

  const sections = [];
  if (bBuses.length > 0) {
    sections.push({
      title: "간선버스",
      data: bBuses,
    });
  }
  if (gBuses.length > 0) {
    sections.push({
      title: "지선버스",
      data: gBuses,
    });
  }
  if (rBuses.length > 0) {
    sections.push({
      title: "직행버스",
      data: rBuses,
    });
  }

  return sections;
};

export const getBusNumColorByType = (type) => {
  switch (type) {
    case "B":
      return COLOR.BUS_B;
    case "G":
      return COLOR.BUS_G;
    case "R":
      return COLOR.BUS_R;
    default:
      return "transparent";
  }
};

export const getRemainedTimeText = (now, arrivalTime) => {
  const remainMinute = dayjs(arrivalTime).diff(dayjs(now), "minute");
  const remainSecond = dayjs(arrivalTime).diff(dayjs(now), "second") % 60;

  if (remainMinute <= 0 && remainSecond <= 0) return "도착 또는 출발";
  if (remainMinute <= 0 && remainSecond < 30) return "곧 도착";
  if (remainMinute <= 0) return `${remainSecond}초`;
  return `${remainMinute}분 ${remainSecond}초`;
};

const MAX_SEAT_NUM_OF_R = 45;
export const getSeatStatusText = (type, numOfPassengers) => {
  switch (type) {
    case "B":
    case "G":
      return numOfPassengers >= 30
        ? "혼잡"
        : numOfPassengers >= 20
        ? "보통"
        : "여유";
    case "R":
      return `${MAX_SEAT_NUM_OF_R - numOfPassengers}석`;
    default:
      return "transparent";
  }
};
