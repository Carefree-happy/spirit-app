import React from 'react';
import { View, Text } from 'react-native';
import AIChat from './AIChat';
import GroupChat from './GroupChat';
import DirectChat from './DirectChat';
import Chat from './Chat';
import AmazingChat from './AmazingChat';
import PureChat from './PureChat';

const ChatRoom = ({ route }) => {
  const { type, id } = route.params;

  const renderChatComponent = () => {
    switch (type) {
      case 'ai':
        return <AIChat chatId={id} />;
      case 'group':
        return <GroupChat chatId={id} />;
      case 'direct':
        return <DirectChat chatId={id} />;
      case 'normal':
        return <Chat chatId={id} />;
      case 'amazing':
        return <AmazingChat chatId={id} />;
      case 'amazing':
        return <PureChat chatId={id} />;
      default:
        return <Text>未知的聊天类型</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderChatComponent()}
    </View>
  );
};

export default ChatRoom; 