import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendDirectMessage,
  updateMessageStatus,
  setUserOnlineStatus,
} from '../../../redux/directChatSlice';

const DirectChat = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(state => state.directChat?.messages[chatId] || []);
  const currentUser = useSelector(state => state.auth.user);
  const onlineStatus = useSelector(state => state.directChat.onlineStatus[chatId]);

  const handleSend = () => {
    if (message.trim()) {
      const messageId = Date.now();
      dispatch(sendDirectMessage({
        chatId,
        message: {
          id: messageId,
          text: message,
          senderId: currentUser.id,
          timestamp: new Date().toISOString(),
        }
      }));
      setMessage('');

      // 模拟消息发送状态更新
      setTimeout(() => {
        dispatch(updateMessageStatus({
          chatId,
          messageId,
          status: 'sent'
        }));
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.senderId === currentUser.id ? styles.userMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.senderId === currentUser.id ? styles.userMessageText : styles.otherMessageText
      ]}>{item.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
        {item.senderId === currentUser.id && (
          <Text style={styles.messageStatus}>
            {item.status === 'sending' ? '发送中...' : 
             item.status === 'sent' ? '已发送' : 
             item.status === 'read' ? '已读' : ''}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {onlineStatus && (
        <Text style={styles.onlineStatus}>
          {onlineStatus === 'online' ? '在线' : '离线'}
        </Text>
      )}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="输入消息..."
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  messageStatus: {
    fontSize: 12,
    color: '#666',
  },
  onlineStatus: {
    fontSize: 12,
    color: '#666',
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
});

export default DirectChat; 