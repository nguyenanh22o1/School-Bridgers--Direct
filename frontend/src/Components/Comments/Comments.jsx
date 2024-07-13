import "./comments.css";
import { BsTrash } from "react-icons/bs";
import { format } from "timeago.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserComment } from "../../redux/apiRequests";
const Comments = (props) => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const [openDelete, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    deleteComment,
    setDeleteComment,
    _id,
    postId,
    ownerId,
    content,
    username,
    avaUrl,
    theme,
    createdAt,
    updatedAt,
  } = props;

  const goToProfile = (userId) => {
    navigate(`/user/${userId}`);
  };
  const handleDelete = () => {
    setOpen(true);
  };
  const confirmDelete = () => {
    setOpen(false);
    deleteUserComment(
      dispatch,
      user?.accessToken,
      _id,
      ownerId,
      setDeleteComment,
      deleteComment
    );
  };
  const closePopup = () => {
    setOpen(false);
  };

  return (
    <section className="comments-container">
      <div
        className="comments-info-container"
        style={{ boxShadow: `0px 0px 6px 1px ${theme}` }}
      >
        <div className="comments-author-info">
          <div className="author-ava-container">
            <img
              className="author-ava"
              onClick={() => goToProfile(ownerId)}
              style={{ backgroundColor: `${theme}` }}
              src={avaUrl}
              alt="comment avatar"
            />
          </div>
          <div className="author-name">{username}</div>
          <div className="comment-date">{format(createdAt).split("ago")}</div>
          {(user.user?._id === ownerId) && (
            <BsTrash
              size={"18px"}
              className="comment-delete"
              color="red"
              onClick={handleDelete}
            />
          )}
        </div>
        <div className="comment-content">{content}</div>
        {openDelete && (
          <div className="comment-delete">
            <div className="comment-delete-title"> Delete this comment? </div>
            <div className="comment-delete-confirm">
              <button
                className="comment-delete-confirm-yes"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="comment-delete-confirm-no"
                onClick={closePopup}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comments;
