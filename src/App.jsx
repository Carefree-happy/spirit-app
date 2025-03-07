import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUserFromStorage } from './redux/authSlice';
import { loadMessagesFromStorage } from './redux/characterChatSlice';

import LandingPage from "./pages/LandingPage/LandingPage";
import GenCharacter from "./pages/GenCharacter/GenCharacter";
import GenFunny from "./pages/GenFunny/GenFunny";
import GenStory from "./pages/GenStory/GenStory";
import LoginForm from './components/Auth/LoginForm';
import ChatList from './components/Chat/ChatList/ChatList';
import ChatRoom from './components/Chat/ChatRoom/ChatRoom';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
    store.dispatch(loadMessagesFromStorage());
  }, []);

  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="GenCharacter" component={GenCharacter} />
          <Stack.Screen name="GenFunny" component={GenFunny} />
          <Stack.Screen name="GenStory" component={GenStory} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen 
            name="ChatRoom" 
            component={ChatRoom}
            options={({ route }) => ({ 
              title: route.params?.name || '聊天',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  /* 顶层容器 */
  appContainer: {
      flex: 1,
      flexDirection: "column", // React Native 不支持 `display: flex`，默认 `flexDirection: column`
      backgroundColor: "#fff7e0",
  },

  /* 适配不同屏幕 */
  responsiveContainer: {
      flex: 1,
  },

  /* 主内容容器 */
  mainContentContainer: {
      flex: 1,
      overflow: "hidden", // React Native 没有 `overflow-y: auto`
      paddingHorizontal: 10,
      paddingVertical: 10,
  },
});
