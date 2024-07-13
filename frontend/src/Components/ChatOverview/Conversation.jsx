import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/listContainer";
import "./chatroom.css";

const Conversation = (props) => {
  const { conversation, currentUser } = props;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?.user._id);
    const getOtherUser = async () => {
      try {
        const res = await axios.get(`${baseURL}/user/${friendId}`, {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getOtherUser();
  }, []);
  return (
    <section className="contact-container">
      <div className="contact-img-container">
        <img
          src={user?.profilePicture}
          alt="profile pic"
          className="contact-img"
        />
      </div>
      <div className="preview-container">
        <div className="preview-username">{user?.username}</div>
      </div>
    </section>
  );
};

export default Conversation;
