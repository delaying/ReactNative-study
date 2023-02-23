import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import RootStackNavigation from "./navigations/RootStackNavigation";
import SplashView from "./SplashView";

export default () => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return <SplashView onFinishLoad={() => setInitialized(true)} />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
