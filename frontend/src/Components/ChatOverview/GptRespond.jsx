import { useSelector } from "react-redux";
import { format } from "timeago.js";
const GPTRespond = (props) => {
    const user = useSelector((state) => state.user.user?.currentUser);
    const userPic = user?.user.profilePicture;
    const { message } = props;
    return (
        <section className={message.role == "User" ? "message own" : "message"}>
            <div className="messageTop">
                <img className={message.role == "User" ? "msg-img-mypic" : "msg-img"} src={message.role == "User" ? `${userPic}` : `${"https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Emblem.png"}`} alt="pic" />
                <p className="messageText">{message.content}</p>
            </div>

        </section>
    );
};
// test commit
export default GPTRespond;
