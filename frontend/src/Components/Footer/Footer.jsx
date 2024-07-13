import { useDispatch, useSelector } from "react-redux";
import { makePostToggle } from "../../redux/navigateSlice";
import "./footer.css";
const Footer = () => {
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.currentUser);
  const handleOpenPost = () => {
    dispatch(makePostToggle(!isOpenPost));
  };
  if (user.user?.isSchoolAdmin) {
    return (
      <footer className="footer" onClick={handleOpenPost}>
        <div className="footer-title" >
          {isOpenPost ? "x" : "+"}
        </div>
      </footer>
    );
  }
  else {
    return (<div></div>);
  }
};

export default Footer;
