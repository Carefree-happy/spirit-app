import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatListItem = ({ chat, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        {/* 这里可以添加头像组件 */}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{chat.name}</Text>
        <Text style={styles.message}>{chat.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});

export default ChatListItem; 