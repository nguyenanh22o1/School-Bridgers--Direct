import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { baseURL } from "../../utils/listContainer";
import { AiOutlineMessage } from "react-icons/ai";
import { followUser, getUser } from "../../redux/apiRequests";
import "./header.css";
import { setRoom } from "../../redux/navigateSlice";
import { BiEdit } from "react-icons/bi";
// import { ReactComponent as Pen } from '../../../icons/pen.svg';
const Header = (props) => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const { id } = useParams();
  const [isFollowed, setFollowed] = useState(user.user?.followings.includes(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  useEffect(() => {
    getUser(dispatch, id, user?.accessToken);
  }, []);
  const handleFollow = () => {
    const userId = {
      userId: user.user?._id,
    };
    followUser(
      dispatch,
      id,
      userId,
      user?.accessToken,
      setFollowed,
      isFollowed
    );
  };

  const goToChat = async () => {
    try {
      const res = await axios.get(`${baseURL}/conversations/find/${id}/${user?.user._id}`, {
        headers: { token: `Bearer ${user?.accessToken}` },
      });
      console.log(res.data)
      if (res.data) {
        dispatch(setRoom(res.data));
        navigate(`/chat/${res.data._id}`);
      } else {
        const newConvo = {
          senderId: user?.user._id,
          receiverId: id,
        };
        await axios
          .post(`${baseURL}/conversations`, newConvo, {
            headers: { token: `Bearer ${user?.accessToken}` },
          })
          .then((res) => {
            dispatch(setRoom(res.data));
            navigate(`/chat/${res.data._id}`);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <header
        style={{
          backgroundImage: `${currentUser?.theme}`,
          backgroundImage: `linear-gradient(180deg,${currentUser?.theme} 2%,${currentUser?.theme}, 65%,#181818 100%)`,
        }}
      >
        <div className="info-container">
          <div className="edit-goback">
            <p className="go-back">
              <IoIosArrowRoundBack
                size={"52px"}
                onClick={() => navigate("/")}
              />
            </p>
            {user.user?._id === id ? (
              // <div className="info-edit" onClick={handleEdit} >

              // </div>
              <BiEdit
                className="info-edit"
                size={"24px"}
                color=""
                onClick={() => handleEdit()}
              />


            ) : (
              <div className="chat-follow-container">
                <AiOutlineMessage
                  size={"36px"}
                  className="chat"
                  onClick={goToChat}
                />
                <div>
                  {currentUser?.isSchoolAdmin ?
                    <button className="follow" onClick={handleFollow}>
                      {`  ${isFollowed ? "Following" : "Follow"}`}
                    </button> : ""
                  }
                </div>


                {/* <button className="follow" onClick={handleFollow}>
                  {`  ${isFollowed ? "Following" : "Follow"}`}
                </button> */}


              </div>
            )}
          </div>
          <img className="theme-control" src={currentUser?.theme} />
          <img className="info-ava" src={currentUser?.profilePicture} alt="" />
          <div className="info-displayname">
            {currentUser?.isSchoolAdmin ? `${currentUser.university}` : `${currentUser?.firstName + " " + currentUser?.lastName}`}
            <span className="info-username"> ({currentUser?.username})</span>
          </div>
          <div className="info-age">Account type : {currentUser?.isSchoolAdmin ? `School` : `Student`}
          </div>
          <div className="info-age">Phone number: {currentUser?.phonenumber} </div>
          <div className="info-age">Email: {currentUser?.email} </div>
          {currentUser?.isSchoolAdmin ? <div className="info-about">About us: {currentUser?.about} </div> : <div className="info-about">About me: {currentUser?.about} </div>}

        </div>
      </header>
    </>
  );
};

export default Header;
