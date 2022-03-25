import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
function TimerComponent(props) {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(props.appointmentDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        วัน: Math.floor(difference / (1000 * 60 * 60 * 24)),
        ชั่วโมง: Math.floor((difference / (1000 * 60 * 60)) % 24),
        นาที: Math.floor((difference / 1000 / 60) % 60),
        วินาที: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());
console.log(year);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Text>
        {timeLeft[interval]} {interval}{" "}
      </Text>
    );
  });
  return (
    <View>
      {timerComponents.length ? timerComponents : <Text>Time's up!</Text>}
    </View>
  );
}

export default TimerComponent;
