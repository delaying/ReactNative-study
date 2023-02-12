import { useEffect, useState } from "react";

const getRandomCookieKey = () => {
  const cookieLen = 15;
  const randomNum = Math.floor(Math.random() * cookieLen);
  console.log("Math.random()", Math.random());
  console.log("randomNum", randomNum);
  // randomNum: 0~14
  // randomNum + 1: 1~15
  return `cookie_${randomNum + 1}`;
};

export const useCookie = () => {
  const [cookieKey, setCookieKey] = useState("");

  useEffect(() => {
    const randomCookieKey = getRandomCookieKey();
    setTimeout(() => {
      setCookieKey(randomCookieKey);
    }, 500);
  }, []);

  return {
    cookieKey,
  };
};
