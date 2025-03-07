import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Animated,
  StyleSheet,
  ActivityIndicator 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setTypingStatus,
  fetchGroupMessages,
  sendGroupMessageAsync
} from '../../../redux/groupChatSlice';

const GroupChat = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector(state => state.groupChat.messages[chatId] || []);
  const currentUser = useSelector(state => state.auth.user);
  const typingUsers = useSelector(state => state.groupChat.typing[chatId] || {});
  const loading = useSelector(state => state.groupChat.loading);
  const error = useSelector(state => state.groupChat.error);

  // 加载历史消息
  useEffect(() => {
    dispatch(fetchGroupMessages(chatId));
  }, [chatId, dispatch]);

  // 处理输入状态
  useEffect(() => {
    let typingTimeout;
    if (message) {
      dispatch(setTypingStatus({ 
        groupId: chatId, 
        userId: currentUser.id, 
        isTyping: true 
      }));
      
      typingTimeout = setTimeout(() => {
        dispatch(setTypingStatus({ 
          groupId: chatId, 
          userId: currentUser.id, 
          isTyping: false 
        }));
      }, 3000);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [message, chatId, currentUser.id]);

  const handleSend = async () => {
    if (message.trim()) {
      const messageData = {
        text: message,
        senderId: currentUser.id,
        senderName: currentUser.name,
        timestamp: new Date().toISOString(),
      };
      
      await dispatch(sendGroupMessageAsync({
        groupId: chatId,
        message: messageData
      }));
      
      setMessage('');
    }
  };

  const renderMessage = (item, index) => {
    const isPersonal = item.senderId === currentUser.id;
    
    return (
      <Animated.View 
        key={item.id}
        style={[
          styles.messageContainer,
          isPersonal ? styles.messagePersonal : styles.messageOther,
        ]}
      >
        {!isPersonal && (
          <View style={styles.avatar}>
            <Image 
              source={{ uri: item.senderAvatar || 'https://via.placeholder.com/30' }}
              style={styles.avatarImage}
            />
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isPersonal ? styles.bubblePersonal : styles.bubbleOther
        ]}>
          <Text style={[
            styles.messageText,
            isPersonal ? styles.textPersonal : styles.textOther
          ]}>{item.text}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderTypingIndicator = () => {
    const typingUserNames = Object.keys(typingUsers)
      .filter(id => id !== currentUser.id)
      .map(id => "某人"); // 这里可以通过participants获取用户名

    if (typingUserNames.length > 0) {
      return (
        <Text style={styles.typingIndicator}>
          {typingUserNames.join(', ')} 正在输入...
        </Text>
      );
    }
    return null;
  };

  // 添加加载状态显示
  if (loading && messages.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#248A52" />
        <Text style={styles.loadingText}>加载消息中...</Text>
      </View>
    );
  }

  // 添加错误状态显示
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>加载失败: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(fetchGroupMessages(chatId))}
        >
          <Text style={styles.retryText}>重试</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatTitle}>
        <View style={styles.titleAvatar}>
          <Image 
            source={{ uri: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg' }}
            style={styles.titleAvatarImage}
          />
        </View>
        <View style={styles.titleText}>
          <Text style={styles.titleName}>群聊名称</Text>
          <Text style={styles.titleStatus}>在线成员: {Object.keys(typingUsers).length}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      <View style={styles.messageBox}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="输入消息..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline
        />
        <TouchableOpacity 
          style={styles.messageSubmit}
          onPress={handleSend}
        >
          <Text style={styles.submitText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatTitle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    overflow: 'hidden',
  },
  titleAvatarImage: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    flex: 1,
  },
  titleName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  titleStatus: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '80%',
  },
  messagePersonal: {
    alignSelf: 'flex-end',
  },
  messageOther: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bubblePersonal: {
    backgroundColor: '#248A52',
  },
  bubbleOther: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  messageText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  textPersonal: {
    color: '#fff',
  },
  textOther: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  messageBox: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  messageInput: {
    flex: 1,
    height: 36,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    marginRight: 10,
  },
  messageSubmit: {
    height: 36,
    paddingHorizontal: 15,
    backgroundColor: '#248A52',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  typingIndicator: {
    fontSize: 12,
    color: '#666',
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#248A52',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default GroupChat; 