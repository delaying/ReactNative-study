import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import RootStackNavigation from "./navigations/RootStackNavigation";
import SplashView from "./SplashView";

export default () => {
  const [initialize, setInitialize] = useState(false);
  if (!initialize) {
    return (
      <SplashView
        onFinishLoad={() => {
          setInitialize(true);
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
