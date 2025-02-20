import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacterChat } from "../../redux/characterChatSlice";

const CharacterChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.characterChat.messages);

  useEffect(() => {
    dispatch(fetchCharacterChat());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Chat</Text>
      {chatMessages.map((msg, index) => (
        <Text key={index} style={styles.message}>
          {msg}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CharacterChat;
