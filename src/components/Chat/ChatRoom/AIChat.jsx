import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  sendMessage, 
  receiveAIResponse,
  setLoading 
} from '../../../redux/aiChatSlice';

const AIChat = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(state => state.aiChat.messages[chatId] || []);
  const loading = useSelector(state => state.aiChat.loading);

  const handleSend = async () => {
    if (message.trim()) {
      dispatch(sendMessage({
        chatId,
        message: {
          id: Date.now(),
          text: message,
          sender: 'user',
          timestamp: new Date().toISOString(),
        }
      }));
      
      // 模拟AI响应
      dispatch(setLoading(true));
      try {
        // 这里可以添加实际的AI API调用
        setTimeout(() => {
          dispatch(receiveAIResponse({
            chatId,
            response: `这是对"${message}"的AI响应`
          }));
          dispatch(setLoading(false));
        }, 1000);
      } catch (error) {
        dispatch(setLoading(false));
      }
      
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userMessageText : styles.aiMessageText
      ]}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
      />
      {loading && (
        <Text style={styles.loadingIndicator}>AI正在思考...</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="输入消息..."
          multiline
          editable={!loading}
        />
        <TouchableOpacity 
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={loading}
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
  aiMessage: {
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
  loadingIndicator: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    color: '#666',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#000',
  },
});

export default AIChat;