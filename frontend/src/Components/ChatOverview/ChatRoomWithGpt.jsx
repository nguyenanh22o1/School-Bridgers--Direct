import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import "./chatroom.css";
import { useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { baseURL } from "../../utils/listContainer";
import Footer from "../Footer/Footer";
import InputField from "../InputFields/Input";
import GPTRespond from "./GptRespond";
import FeedHeader from "../Feed/Header/FeedHeader";
import SideBarLeft from "../Feed/YourFollowingRight/SideBarLeft";
import SideBarRight from "../Feed/YourFollowingRight/SideBarRight";
const ChatRoomWithGpt = () => {
    const user = useSelector((state) => state.user.user?.currentUser);
    const room = useSelector((state) => state.nav.message.room);
    // const otheruser = useSelector((state) => state.user.oht?.currentUser);
    const [messages, setMessage] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [receivedMsg, setReceivedMsg] = useState("");
    const socket = useRef();
    const [partner, setPartner] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const navigate = useNavigate();
    const scrollRef = useRef();
    const { id } = useParams();
    const [questionabc, setQuestion] = useState("");
    const [count, setCount] = useState(0);




    const handleGoBack = () => {
        navigate("/chat");
        socket.current.disconnect();
    };

    useEffect(() => {
        socket.current = io("http://localhost:8888", {
            transports: ["websocket"],
        });
        socket.current.on("getMessage", (data) => {
            setReceivedMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [messages]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.post(`${baseURL}/gpt`, questionabc, {
                    headers: { token: `Bearer ${user.accessToken}` },
                });
                // setMessage([...messages, res.data]);
                setMessage(messages => [...messages, res.data]);
                setNewMsg("");
            } catch (err) {
                console.log(err);
            }
        };
        getMessage();
    }, [questionabc]);

    const submitMessage = async () => {
        const message = {
            sender: user?.user._id,
            question: newMsg,
        };
        if (newMsg.length === 0) {
            console.log("Empty msg");
        } else {
            // socket.current.emit("sendMessage", {
            //     senderId: user?.user._id,
            //     receiverId: "GPT",
            //     text: newMsg,
            // });

            const temp = {
                content: newMsg,
                role: "User"
            }
            setMessage(messages => [...messages, temp]);
            setQuestion(message)
            setNewMsg("")

        }
    };


    // useEffect(() => {
    //     scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);



    return (
        <section><FeedHeader />
            <SideBarLeft></SideBarLeft>
            <SideBarRight></SideBarRight>
            <div className="convo-container">
                <div className="convo-header">
                    <div className="message-header">
                        <div className="go-back-convo" onClick={handleGoBack}>
                            <IoIosArrowRoundBack size={"42px"} />
                        </div>
                        {"GPT"}
                    </div>
                </div>
                <div className="chat-box-top">
                    {console.log(messages)}
                    {messages.map((msg) => {
                        return (
                            <div ref={scrollRef} className="msg-container">
                                <GPTRespond
                                    message={msg}
                                    own={msg.sender === user.user._id}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="chat-box-bot">
                    <InputField
                        classStyle="chat-msg-input"
                        inputType="textarea"
                        placeholder="write something..."
                        setData={setNewMsg}
                        value={newMsg}
                        data={newMsg}
                    />
                    <button className="chat-submit" onClick={submitMessage} >
                        Send
                    </button>
                </div>
                <Footer />
            </div>
        </section>
    );
};

export default ChatRoomWithGpt;