import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import HomePage from "./Components/Feed/HomePage/HomePage";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import News from "./Components/Feed/News/News";
import Footer from "./Components/Footer/Footer";
import Friends from "./Components/Friends/Friends";
import ChatRoom from "./Components/ChatOverview/ChatRoom";
import LandingPage from "./Components/LandingPage/LandingPage";
import { useEffect } from "react";
import UniRegister from "./Components/Auth/Uni-register";
import ChatRoomWithGpt from "./Components/ChatOverview/ChatRoomWithGpt";
import ChatOverview from "./Components/ChatOverview/ChatOverview";
import FeedHeader from "./Components/Feed/Header/FeedHeader";
import SideBarLeft from "./Components/Feed/YourFollowingRight/SideBarRight";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [isOpenPost, setOpen] = useState(false);
  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        heigth: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (windowSize.width > 500) {
      setMobile(true);
    } else {
      setMobile(true);
    }
  }, [windowSize]);
  return (
    <Router>
      <div className="App">
        <Routes>
          {true ? (
            <>
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/uni-register" element={<UniRegister />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/news"
                element={
                  <RequireAuth>
                    <News />
                  </RequireAuth>
                }
              />
              <Route
                path="/userfollowingpost"
                element={
                  <RequireAuth>
                    <Friends />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat"
                element={
                  <RequireAuth>

                    <ChatOverview />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <RequireAuth>
                    {/* <FeedHeader /> */}
                    <ChatRoom />
                  </RequireAuth>
                }
              />
              <Route
                path="/chatWgpt"
                element={<ChatRoomWithGpt />
                }

              />
              <Route
                path="/user/:id"
                element={
                  <RequireAuth>

                    <UserProfile
                      isEdit={isEdit}
                      setEdit={setEdit}
                      isOpenPost={isOpenPost}
                      setOpen={setOpen}
                    />
                  </RequireAuth>
                }
              />
            </>
          ) : (
            <Route path="/landingpage" element={<LandingPage />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
