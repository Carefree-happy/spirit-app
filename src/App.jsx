import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import styles from "./App";  // ✅ 引入样式文件
import LandingPage from "./pages/LandingPage/LandingPage";
import GenCharacter from "./pages/GenCharacter/GenCharacter";
import GenFunny from "./pages/GenFunny/GenFunny";
import GenStory from "./pages/GenStory/GenStory";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.appContainer}>  // ✅ 确保 styles 正确引入
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="GenCharacter" component={GenCharacter} />
          <Stack.Screen name="GenFunny" component={GenFunny} />
          <Stack.Screen name="GenStory" component={GenStory} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
