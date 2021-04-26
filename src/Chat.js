import React, { useState, useEffect } from "react";
import "./Chat.css";
// Avatar, IconButton ===> takes from @material-ui/core
import { Avatar, IconButton } from "@material-ui/core";
// Other icons ===> takes from @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
// useParams = path parameter info get
// <Route path = '/home/:id' component = {Home}/>
// ==> /:id  (dynamic routing)
// ## FOR USING useParams ==> HAVE TO USE Dynamic Routing
// <ex> const Home = () => {const {id} = useParmas()}
//  동적 라우팅 값 (id) 으로 걸어둔 이름으로 객체를 가져올 수 있다.
import { useParams } from "react-router-dom";
// From firebase => get 'db'.
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  // By using useParams ==> by using roomId ==> can get Object of roomId
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  // Unstable State value ===> using useState('')
  // seed, input, roomName, messages ==> all dynamic state
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  // By using useEffect(() => {}, [])
  // if component rendered ==> code executed once
  useEffect(() => {
    // Want to display changed roomName
    // 'rooms' collection => 'roomId' doc => snapshot.data().name
    // total data get ==> using data()
    db.collection("rooms")
      .doc(roomId)
      // setRoomName ==> roomName changed
      .onSnapshot((snapshot) => setRoomName(snapshot.data.name));
    // Want to display messages ordered by time.
    // 'rooms' collection => 'roomId' doc => 'messages' collection
    // orderBy 'timestamp' && 'ascending'
    // docs mapping ===> doc.data()  displaying !!!
    // new message displayed with new doc.data()
    // [roomId] === dependency
    // If roomId changed ==> code executed
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  // If roomId changed ==> seed changed randomly
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  // sendMessage
  // 'rooms' collection => 'roomId' doc => 'messages' collection  add
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // input state changed
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        {/* To get Avatar Randomly  */}
        {/* avatars.dicebear.com/human/123.svg */}
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_header_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
