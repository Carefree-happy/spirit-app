import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChatListItem from './ChatListItem';

const ChatList = ({ navigation }) => {
  const chatRooms = [
    { id: 1, type: 'ai', name: 'AI chat', lastMessage: '有什么可以帮您的？' },
    { id: 'group1', type: 'group', name: 'group chat', lastMessage: '大家好！' },
    { id: 3, type: 'direct', name: 'direct chat', lastMessage: '明天见！' },
    { id: 4, type: 'normal', name: 'chat', lastMessage: 'let it go' },
    { id: 5, type: 'amazing', name: 'amazing chat', lastMessage: 'let it go' },
    { id: 6, type: 'pure', name: 'pure chat', lastMessage: 'let it go' },
  ];

  const handleChatSelect = (chatId, type, name) => {
    navigation.navigate('ChatRoom', {
      id: chatId,
      type: type,
      name: name
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>聊天列表</Text>
      <View style={styles.listContainer}>
        {chatRooms.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onPress={() => handleChatSelect(chat.id, chat.type, chat.name)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  listContainer: {
    flex: 1,
  }
});

export default ChatList; 