import "./Chat.css";
import { socket } from "../../socket";
import { addMessage, setOffset } from "../../store/reducers/chatReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const containerRef = useRef(null);
  const currentUserName = useSelector((state) => state.chatReducer.userName);
  const currentRoomID = useSelector((state) => state.chatReducer.roomID);
  const chatMessages = useSelector((state) => state.chatReducer.messages);
  const clientOffset = useSelector((state) => state.chatReducer.offset);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputMessage) return;

    const newMessage = {
      userName: currentUserName,
      text: inputMessage,
      roomID: currentRoomID,
    };
    const messageWithClientOffset = `${socket.id}-${clientOffset}`;

    dispatch(addMessage(newMessage));

    socket
      .timeout(5000)
      .emit("chat message", newMessage, messageWithClientOffset);

    setInputMessage("");
  };

  useEffect(() => {
    const handleChatMessage = (message, serverOffset) => {
      dispatch(addMessage(message));
      dispatch(setOffset(serverOffset));
      socket.auth.serverChatOffset = serverOffset;
    };

    socket.on("chat message", handleChatMessage);

    return () => {
      socket.off("chat message", handleChatMessage);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-container">
      <div className="messages-container" ref={containerRef}>
        {chatMessages.map((message, index) => {
          return (
            <div className="message" key={index}>
              <p>{message.userName}</p>
              <p>{message.text}</p>
            </div>
          );
        })}
      </div>
      <form className="chat-form">
        <input value={inputMessage} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
