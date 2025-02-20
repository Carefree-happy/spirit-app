import React from "react";
import { View, Button, Text } from "react-native";

const GenStory = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>📖 GenStory Page</Text>
      <Button title="Back to Landing Page" onPress={() => navigation.navigate("Landing")} />
    </View>
  );
};

export default GenStory;  // ✅ 确保是 `export default`
