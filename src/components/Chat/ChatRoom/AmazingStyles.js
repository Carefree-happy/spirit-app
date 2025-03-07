import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
  },
  contacts: {
    width: '40%',
    backgroundColor: 'white',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#333',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: 10,
    flex: 1,
  },
  contactName: {
    fontWeight: '500',
    fontSize: 16,
  },
  messagePreview: {
    color: '#999',
    fontSize: 14,
  },
  chatHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTime: {
    fontSize: 12,
    color: '#999',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  timeStamp: {
    alignItems: 'center',
    marginVertical: 16,
  },
  timeText: {
    color: '#999',
    fontSize: 12,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 10,
  },
  messageParker: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 10,
    marginLeft: '30%',
    marginVertical: 8,
  },
  messageStark: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginRight: '30%',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    height: 40,
  },
  inputIcon: {
    marginHorizontal: 8,
  },
}); 