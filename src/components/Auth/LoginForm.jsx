import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ActivityIndicator,
    Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser } from '../../redux/authSlice';
import { clearMessagesFromStorage } from '../../redux/characterChatSlice';

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    
    const dispatch = useDispatch();
    const { isLoading, error, user } = useSelector(state => state.auth);

    const handleSubmit = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('错误', '请填写用户名和密码');
            return;
        }

        const action = isRegisterMode ? registerUser : loginUser;
        const success = await dispatch(action(username, password));

        if (success) {
            // 登录成功后跳转到聊天页面
            navigation.navigate('Chat');
        }
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setUsername('');
        setPassword('');
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        await clearMessagesFromStorage();
    };

    if (user) {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeText}>欢迎, {user.username}!</Text>
                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={() => navigation.navigate('Chat')}
                >
                    <Text style={styles.buttonText}>进入聊天</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>退出登录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegisterMode ? '注册' : '登录'}</Text>
            
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            <TextInput
                style={styles.input}
                placeholder="用户名"
                value={username}
                onChangeText={setUsername}
                editable={!isLoading}
            />
            
            <TextInput
                style={styles.input}
                placeholder="密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
            />
            
            <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {isRegisterMode ? '注册' : '登录'}
                    </Text>
                )}
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.toggleButton}
                onPress={toggleMode}
                disabled={isLoading}
            >
                <Text style={styles.toggleText}>
                    {isRegisterMode ? '已有账号？去登录' : '没有账号？去注册'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5A5A5',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleButton: {
        marginTop: 15,
        padding: 10,
    },
    toggleText: {
        color: '#007AFF',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    chatButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: '#FF3B30',
    },
});

export default LoginForm; 