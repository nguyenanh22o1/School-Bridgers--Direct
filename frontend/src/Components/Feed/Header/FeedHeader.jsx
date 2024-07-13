// import { useEffect } from "react";
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utils/listContainer";
import { AiOutlineMessage, AiOutlineHome } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
import { messageToggle, sideBarToggle } from "../../../redux/navigateSlice";
// import { DropDownProfile } from "../Header/DropDownProfile";
import InputField from "../../InputFields/Input";
import "../feed.css";
// import { CgProfile } from "react-icons/cg";
// import React from "react";
// import DropDownProfile from "./DropDownProfile";


// SUPPER IMPORT
import './superheader.css';
import { ReactComponent as BellIcon } from '../../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../../icons/messenger.svg';
import { ReactComponent as Home } from '../../../icons/home.svg';
import { ReactComponent as CaretIcon } from '../../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../../icons/plus.svg';
import { ReactComponent as CogIcon } from '../../../icons/cog.svg';
import { ReactComponent as NewsIcon } from '../../../icons/news.svg';
import { ReactComponent as FollowingIcon } from '../../../icons/follower.svg';
import { ReactComponent as ChevronIcon } from '../../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../../icons/bolt.svg';
import { logOutUser } from "../../../redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function FeedHeader() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  // const user = useSelector((state) => state.user.user?.currentUser);
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.currentUser);
  const openMsg = useSelector((state) => state.nav.message.open);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [result, setResulsts] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const goToProfile = (id) => {
    navigate("/user/" + id);
  };


  const searchUsername = async () => {
    await axios
      .get(`${baseURL}/user/search/${search}`, {
        headers: { token: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        if (search == "") {
          setResulsts([]);
        } else {
          setResulsts(res.data);
        }
      });
    console.log(result);
  };


  const handleOpenMsg = () => {
    navigate("/chat")
    // dispatch(messageToggle(true));

  };
  const handleCloseMsg = () => {
    dispatch(messageToggle(false));
  };

  const goHome = () => {
    navigate("/")
    window.location.reload();
  }

  const goNews = () => {
    navigate("/news")
  }

  const goFollower = () => {
    navigate("/userfollowingpost")
  }

  useEffect(() => {
    if (search === "") {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
      searchUsername();
    }
  }, [search]);

  return (
    <Navbar>
      <NavItem className="logo" icon={<Home onClick={goHome} />} />

      <div className="searchbarposition">
        <InputField
          classStyle="searchbar"
          placeholder=" Search for username"
          data={search}
          setData={setSearch}
        />

        {openSearch && (
          <div className="feed-username-display">
            {result?.map((username) => {
              return (
                <div
                  className="user-container"
                  onClick={() => goToProfile(username._id)}
                >
                  <img
                    style={{ backgroundColor: `${username.theme}` }}
                    src={username.profilePicture}
                    alt="profile pic"
                    className="username-profile"
                  />
                  <div className="username"> {username.username}</div>
                </div>
              );
            })}
          </div>
        )}

      </div>
      <NavItem icon={<FollowingIcon onClick={goFollower} />} />
      <NavItem icon={<NewsIcon onClick={goNews} />} />


      <NavItem icon={<MessengerIcon onClick={() => handleOpenMsg()} />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar >
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}


function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="javascript:void(0);" className="icon-button" onClick={() => setOpen(!open)} >
        {props.icon}

      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user.user?.currentUser);
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user.user?.currentUser);
  const openMsg = useSelector((state) => state.nav.message.open);
  // const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [result, setResulsts] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);


  const goToProfile = (id) => {
    navigate("/user/" + id);
  };


  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="javascript:void(0);" className="menu-item" onClick={() => goToProfile(user.user?._id)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a >
    );
  }

  function DropdownItemLogout(props) {
    return (
      <a href="javascript:void(0);" className="menu-item" onClick={logOut}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a >
    );
  }

  const dispatch = useDispatch();
  const logOut = () => {
    console.log(user.accessToken, user?._id)
    logOutUser(dispatch, user?.accessToken, user?._id, navigate);
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem
            leftIcon={<img
              src={user.user?.profilePicture} className="avatar-dog-shit"
              width="42"
              height="42"
              // background-size="cover"
              // border="50%"
              onClick={() => goToProfile(user.user?._id)}
            />}
            rightIcon={<ChevronIcon />}
          >
            <Link to={`/user/${user.user?._id}`}>
              My profile
            </Link>
          </DropdownItem>

          <DropdownItemLogout
            leftIcon={<CogIcon onClick={logOut} />}
            rightIcon={<ChevronIcon onClick={logOut} />}
          >
            Logout

          </DropdownItemLogout>
        </div>
      </CSSTransition>
    </div>
  );
}

// const FeedHeader = () => {
//   const user = useSelector((state) => state.user.user?.currentUser);
//   const openMsg = useSelector((state) => state.nav.message.open);
//   const dispatch = useDispatch();
// const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const [result, setResulsts] = useState([]);
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openProfile, setOpenProfile] = useState(false);

//   const setOpen = () => {
//     dispatch(sideBarToggle(true));
//   };
//   const goToProfile = (id) => {
//     navigate("/user/" + id);
//   };
// const searchUsername = async () => {
//   await axios
//     .get(`${baseURL}/user/search/${search}`, {
//       headers: { token: `Bearer ${user.accessToken}` },
//     })
//     .then((res) => {
//       if (search === "") {
//         setResulsts([]);
//       } else {
//         setResulsts(res.data);
//       }
//     });
// };

// const handleOpenMsg = () => {
//   dispatch(messageToggle(true));
// };
// const handleCloseMsg = () => {
//   dispatch(messageToggle(false));
// };
// useEffect(() => {
//   if (search === "") {
//     setOpenSearch(false);
//   } else {
//     setOpenSearch(true);
//     searchUsername();
//   }
// }, [search]);



//   return (
//     <header className="feed-logo">
//       <img
//         onClick={() => setOpen(true)}
//         className="feed-logo-img"
//         src={user.user?.profilePicture}
//         alt=""
//       />
//       <div className="search-container">
//         <InputField
//           classStyle="search-bar"
//           placeholder="🔎 Search for username"
//           data={search}
//           setData={setSearch}
//         />
//         {openSearch && (
//           <div className="feed-username-display">
//             {result?.map((username) => {
//               return (
//                 <div
//                   className="user-container"
//                   onClick={() => goToProfile(username._id)}
//                 >
//                   <img
//                     style={{ backgroundColor: `${username.theme}` }}
//                     src={username.profilePicture}
//                     alt="profile pic"
//                     className="username-profile"
//                   />
//                   <div className="username"> {username.username}</div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       {openMsg ? (
//         <AiOutlineHome
//           size="24px"
//           className="message-outline"
//           onClick={() => handleCloseMsg()}
//         />
//       ) : (
//         <AiOutlineMessage
//           size="24px"
//           className="message-outline"
//           onClick={() => handleOpenMsg()}
//         />
//       )}
//       {/* {
//         open Profile && <DropDownProfile />
//       } */}
//       {/* <DropDownProfile /> */}
//     </header>
//   );
// };

export default FeedHeader;
