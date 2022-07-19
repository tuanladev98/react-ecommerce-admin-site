import './ChatBox.css';

export default function ChatBox() {
  return (
    <div className="chatBox">
      <div className="conversationContainer">
        <div className="conversation">
          <div className="userImage">
            <img
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
          </div>
          <div className="userInfo">
            <span className="userName">Le Anh Tuan</span>
            <span className="lastMessage">Chich da vai</span>
          </div>
          <div className="conversationInfo">
            <span className="lastMessageTime">23:00</span>
            <span>2</span>
          </div>
        </div>
      </div>
      <div className="messageBoxContainer"></div>
    </div>
  );
}
