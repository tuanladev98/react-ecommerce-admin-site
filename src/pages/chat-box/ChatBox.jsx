import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './ChatBox.css';
import { changeMenu } from '../../redux/side_bar_slice';
import { Send } from '@material-ui/icons';
import { format } from 'timeago.js';

export default function ChatBox() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMenu('MESSAGE'));
  }, [dispatch]);

  return (
    <div className="chatBox">
      <div className="conversationContainer">
        <div className="conversationList">
          <div className="conversation">
            <img
              className="userImage"
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            <div className="userInfo">
              <span className="userName">Le Anh Tuan</span>
              <span className="lastMessage">Hello, can you help me?</span>
            </div>
            <div className="conversationInfo">
              <span className="lastMessageTime">
                {format(new Date('2022-01-15T11:02:17Z'))}
              </span>
              <span className="unreadMessage">9+</span>
            </div>
          </div>

          <div className="conversation active">
            <img
              className="userImage"
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            <div className="userInfo">
              <span className="userName">Le Anh Tuan</span>
              <span className="lastMessage">Hello, can you help me?</span>
            </div>
            <div className="conversationInfo">
              <span className="lastMessageTime">23:00</span>
              <span className="unreadMessage">2</span>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}
