import React from "react";
import { View, Button, Text } from "react-native";

const GenFunny = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🤣 GenFunny Page</Text>
      <Button title="Back to Landing Page" onPress={() => navigation.navigate("Landing")} />
    </View>
  );
};

export default GenFunny;  // ✅ 确保是 `export default`
