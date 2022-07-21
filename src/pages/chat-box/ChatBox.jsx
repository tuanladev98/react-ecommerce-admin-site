import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Send } from '@material-ui/icons';

import './ChatBox.css';

import { changeMenu } from '../../redux/side_bar_slice';
import chatApis from '../../api/chat.api';

export default function ChatBox() {
  const dispatch = useDispatch();
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('MESSAGE'));
  }, [dispatch]);

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
    setActiveConversation(convData);
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
                  <span className="lastMessage">{conv.latestMessage}</span>
                </div>
                <div className="conversationInfo">
                  <span className="lastMessageTime">
                    {new Date(conv.latestMessageDate).toLocaleString()}
                  </span>
                  <span className="unreadMessage">
                    {parseInt(conv.totalUnseenMessage) > 9
                      ? '9+'
                      : conv.totalUnseenMessage}
                  </span>
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
            <div className="messageBoxHeaderUserImage">
              <span>LA</span>
            </div>
            <div className="messageBoxHeaderUserName">
              <span>Le Anh Tuan</span>
            </div>
          </div>
          <div className="messageBoxMain">
            <div className="messageElement incomeMessage">
              <div className="messageMain">
                <div className="messageContent">
                  Xin chào! Tôi giúp gì được cho bạn
                </div>
                <span className="messageTime">23:00</span>
              </div>
            </div>

            <div className="messageElement sentMessage">
              <div className="messageMain">
                <div className="messageContent">
                  Xin chào! Tôi giúp gì được cho bạn
                </div>
                <span className="messageTime">
                  {new Date('2022-01-15T11:02:17Z').toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="messageBoxFooter">
            <div className="messageInputContainer">
              <textarea
                className="messageInput"
                placeholder="Type a message..."
              ></textarea>
            </div>
            <div className="sendBtn activeBtn">
              <Send />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
