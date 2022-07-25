import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Send } from '@material-ui/icons';
import * as dayjs from 'dayjs';
import { toast } from 'react-toastify';

import './ChatBox.css';

import { changeMenu } from '../../redux/side_bar_slice';
import chatApis from '../../api/chat.api';
import { SocketContext } from '../../socket/socketContext';

export default function ChatBox() {
  const adminId = JSON.parse(localStorage.getItem('currentAdmin')).userInfo.id;

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [textMessageInput, setTextMessageInput] = useState(null);

  useEffect(() => {
    socket.emit('admin_online', {
      adminId,
    });

    socket.on('new_message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket.on('has_new_message_from_client', (convData) => {
      const currConversations = [...conversations];
      const idx = currConversations.findIndex(
        (conv) => conv.id === convData.id
      );

      if (idx !== -1) currConversations.splice(idx, 1);
      currConversations.unshift(convData);

      setConversations(currConversations);
    });

    socket.on('has_new_message_from_admin', (convData) => {
      const currConversations = [...conversations];
      const idx = currConversations.findIndex(
        (conv) => conv.id === convData.id
      );

      if (idx !== -1) currConversations.splice(idx, 1);
      currConversations.unshift(convData);

      setConversations(currConversations);
    });

    socket.on('admin_seen_message_for_client', (data) => {
      const { clientId } = data;
      let currConversations = [...conversations];
      const idx = currConversations.findIndex((conv) => conv.id === clientId);
      if (idx !== -1)
        currConversations[idx] = {
          ...currConversations[idx],
          totalUnseenMessage: '0',
        };
      setConversations(currConversations);
    });

    return () => {
      socket.off('new_message');
      socket.off('has_new_message_from_client');
      socket.off('has_new_message_from_admin');
      socket.off('admin_seen_message_for_client');
    };
  }, [socket, adminId, messages, conversations]);

  useEffect(() => {
    dispatch(changeMenu('MESSAGE'));
  }, [dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    chatApis
      .getAllConversation()
      .then((result) => {
        setConversations(result.data);
      })
      .catch((error) => setConversations([]));
  }, []);

  const getAbbreviationsName = (name) => {
    const arr = name.split(' ');
    if (arr.length > 1) return (arr[0][0] + arr[1][0]).toUpperCase();
    else arr[0][0].toUpperCase();
  };

  const handleClickConversation = (convData) => {
    if (activeConversation && activeConversation.id !== convData.id)
      socket.emit('admin_leave_client_room', {
        clientId: activeConversation.id,
      });
    if (!activeConversation || activeConversation.id !== convData.id) {
      socket.emit('admin_join_client_room', { clientId: convData.id });
      chatApis
        .getMessages(convData.id)
        .then((result) => {
          setMessages(result.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('error get history messages');
        });
    }
    setActiveConversation(convData);
    setTextMessageInput(null);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      return handleSendMessage(e);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (textMessageInput)
      socket.emit('admin_send_message_text', {
        clientId: activeConversation.id,
        text: textMessageInput,
      });
    setTextMessageInput(null);
  };

  const handleAdminSeen = (e) => {
    e.preventDefault();
    socket.emit('admin_seen', {
      clientId: activeConversation.id,
    });
  };

  return (
    <div className="chatBox">
      <div className="conversationContainer">
        <div className="conversationList">
          {conversations.map((conv) => {
            return (
              <div
                className={
                  activeConversation && conv.id === activeConversation.id
                    ? 'conversation active'
                    : 'conversation'
                }
                onClick={() => handleClickConversation(conv)}
              >
                <div
                  className="userImage"
                  style={{ backgroundColor: conv.userColor }}
                >
                  <span>{getAbbreviationsName(conv.name)}</span>
                </div>
                <div className="userInfo">
                  <span className="userName">{conv.name}</span>
                  <span className="lastMessage">
                    {conv.latestMessageSender === 'ADMIN'
                      ? `You: ${conv.latestMessage}`
                      : conv.latestMessage}
                  </span>
                </div>
                <div className="conversationInfo">
                  <span className="lastMessageTime">
                    {dayjs(conv.latestMessageDate).format('DD-MM-YYYY HH:mm')}
                  </span>
                  {parseInt(conv.totalUnseenMessage) === 0 ? (
                    <span></span>
                  ) : (
                    <span className="unreadMessage">
                      {parseInt(conv.totalUnseenMessage) > 9
                        ? '9+'
                        : conv.totalUnseenMessage}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!activeConversation ? (
        <div className="messageBoxContainerEmpty">
          <span>Welcome! Take a conversation to support customer.</span>
        </div>
      ) : (
        <div className="messageBoxContainer">
          <div className="messageBoxHeader">
            <div className="messageBoxHeaderUserInfo">
              <div
                className="messageBoxHeaderUserImage"
                style={{ backgroundColor: activeConversation.userColor }}
              >
                <span>{getAbbreviationsName(activeConversation.name)}</span>
              </div>
              <div className="messageBoxHeaderUserName">
                <span>{activeConversation.name}</span>
              </div>
            </div>
            <div messageBoxHeaderAction>
              <Link to={'/user/' + activeConversation.id}>
                <button className="btnShowUserDetail">Detail</button>
              </Link>
            </div>
          </div>

          <div className="messageBoxMain">
            {messages.map((message) => {
              return (
                <div
                  className={`messageElement ${
                    message.sender === 'ADMIN' ? 'sentMessage' : 'incomeMessage'
                  }`}
                >
                  <div className="messageMain">
                    <div className="messageContent">{message.text}</div>
                    <span className="messageTime">
                      {dayjs(message.createdAt).format('DD-MM-YYYY HH:mm')}
                    </span>
                  </div>
                </div>
              );
            })}

            <div ref={scrollRef} />
          </div>

          <div className="messageBoxFooter">
            <div className="messageInputContainer">
              <textarea
                className="messageInput"
                placeholder="Type a message..."
                value={!textMessageInput ? '' : textMessageInput}
                onChange={(e) => setTextMessageInput(e.target.value)}
                onFocus={handleAdminSeen}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            <div
              className={!textMessageInput ? 'sendBtn' : 'sendBtn activeBtn'}
              onClick={handleSendMessage}
            >
              <Send />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
