import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Image,
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './AmazingStyles';

const AmazingChat = () => {
  const scrollViewRef = useRef(null);

  const contacts = [
    {
      pic: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/05/HeyPeterParker.png',
      name: 'Steve Rogers',
      message: "That is America's ass 🇺🇸🍑",
      badge: 14
    },
    // ... 其他联系人
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contacts}>
        <Icon name="bars" size={24} color="#999" />
        <Text style={styles.heading}>Contacts</Text>
        
        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Image source={contact.pic} style={styles.avatar} />
            {contact.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{contact.badge}</Text>
              </View>
            )}
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.messagePreview}>{contact.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <Image 
            source={{ uri: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/05/HeyPeterParker.png'}} 
            style={styles.avatar} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Tony Stark</Text>
            <Text style={styles.headerTime}>Today at 12:56</Text>
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.timeStamp}>
            <Text style={styles.timeText}>Today at 11:41</Text>
          </View>

          <View style={styles.messageParker}>
            <Text style={styles.messageText}>Hey, man! What's up, Mr Stark? 👋</Text>
          </View>

          <View style={styles.messageStark}>
            <Text style={styles.messageText}>Kid, where'd you come from?</Text>
          </View>

          {/* ... 其他消息 */}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="camera" size={24} color="#666" style={styles.inputIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="smile-o" size={24} color="#666" style={styles.inputIcon} />
          </TouchableOpacity>
          <TextInput 
            style={styles.input}
            placeholder="Type your message here!"
            placeholderTextColor="#999"
          />
          <TouchableOpacity>
            <Icon name="microphone" size={24} color="#666" style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AmazingChat;
