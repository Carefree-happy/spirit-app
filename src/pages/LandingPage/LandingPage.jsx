import React from "react";
import { View, Button, Text } from "react-native";

const LandingPage = ({ navigation }) => {  // ✅ 改为 `export default`
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>👋 Welcome to Landing Page</Text>
      <Button title="Go to GenCharacter" onPress={() => navigation.navigate("GenCharacter")} />
      <Button title="Go to GenFunny" onPress={() => navigation.navigate("GenFunny")} />
      <Button title="Go to GenStory" onPress={() => navigation.navigate("GenStory")} />
      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default LandingPage;  // ✅ 确保是 `export default`
