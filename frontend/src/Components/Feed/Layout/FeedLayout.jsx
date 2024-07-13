import "../feed.css";
import "../Layout/layout.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/FeedSideBar";
import FeedHeader from "../Header/FeedHeader";
import FeedNavBar from "../FeedNavBar/FeedNavBar";
import Footer from "../../Footer/Footer";
import MakePost from "../../Posts/MakePost";
import ChatOverview from "../../ChatOverview/ChatOverview";
import SideBarRight from "../YourFollowingRight/SideBarRight";
import SideBarLeft from "../YourFollowingRight/SideBarLeft";

const FeedLayout = ({ children }) => {
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const openMsg = useSelector((state) => state.nav.message.open);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);

  return (
    <>
      {user && (
        <>
          <SideBar />

          {isOpenPost ? (
            <section
              className={`${isOpen ? "feed-container-opened" : "feed-container"
                }`}
            >
              <FeedHeader />
              <FeedNavBar />
              <SideBarRight />
              <SideBarLeft />
              <MakePost />

            </section>
          ) : !isOpenPost && !openMsg ? (
            <section
              className={`${isOpen ? "feed-container-opened" : "feed-container"
                }`}
            >

              <FeedHeader>
              </FeedHeader>
              <img className="imageLogoHomepage" src="https://scontent.fmel3-1.fna.fbcdn.net/v/t1.15752-9/334924647_1163884680938217_788074661084460131_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=jk3HP5EHmwEAX80JNpu&_nc_ht=scontent.fmel3-1.fna&oh=03_AdTT9iBT2gJ-D6u7gWOGo534VzbiNT0edYLLbAzP51azTQ&oe=64577753" alt="logo" />

              <SideBarRight />
              <SideBarLeft />
              <FeedNavBar />
              {children}

            </section>
          ) : (
            <section
              className={`${isOpen ? "feed-container-opened" : "feed-container"
                }`}
            >
              <FeedHeader />
              <ChatOverview />
            </section>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default FeedLayout;
