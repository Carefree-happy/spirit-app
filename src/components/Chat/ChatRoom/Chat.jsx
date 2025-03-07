import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../../redux/characterChatSlice';
import { loadUserFromStorage } from '../../../redux/authSlice';

const Chat = ({ id }) => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messages = useSelector(state => state.characterChat?.messages[id] || []);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = loadUserFromStorage();
        dispatch(action);
    }, [dispatch]);

    const simulateResponse = async () => {
        setIsLoading(true);
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        dispatch(addMessage({
            id: Date.now(),
            text: '这是一个模拟的回复消息',
            sender: 'bot'
        }));
        setIsLoading(false);
    };

    const handleSend = () => {
        if (inputText.trim() && !isLoading) {
            dispatch(addMessage({
                id: Date.now(),
                text: inputText,
                sender: 'user'
            }));
            setInputText('');
            simulateResponse();
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.botMessage
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'bot' && styles.botMessageText
            ]}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id.toString()}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="输入消息..."
                    editable={!isLoading}
                />
                <TouchableOpacity 
                    style={[styles.sendButton, isLoading && styles.sendButtonDisabled]} 
                    onPress={handleSend}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.sendButtonText}>发送</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        maxWidth: '80%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        color: '#fff',
    },
    botMessageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 20,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        minWidth: 60,
    },
    sendButtonDisabled: {
        backgroundColor: '#A5A5A5',
    },
    sendButtonText: {
        color: '#fff',
    },
});

export default Chat; 