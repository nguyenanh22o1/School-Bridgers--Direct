import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listContainer } from "../../utils/listContainer";
import { updateUser } from "../../redux/apiRequests";
import InputField from "../InputFields/Input";

import "./edit.css";
const EditPage = (props) => {
  const { setEdit } = props;
  const { id } = useParams();
  const user = useSelector((state) => state.user.user?.currentUser);
  const [name, setName] = useState(user?.displayName);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [theme, setTheme] = useState(user?.theme);
  const [previewSource, setPreviewSource] = useState("");
  const [url, setUrl] = useState(
    "https://scontent.fmel3-1.fna.fbcdn.net/v/t1.15752-9/334924647_1163884680938217_788074661084460131_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=BHiSrQPut9UAX8r1xC6&_nc_ht=scontent.fmel3-1.fna&oh=03_AdSbjH6KAwzifjrW_0PTg6Z-q1oui_QeOOADCvG1SCeO7A&oe=64523153"
  );
  const dispatch = useDispatch();
  const avaUrl = listContainer.avaUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    const updatedUser = {
      university: name,
      about: about,
      profilePicture: url,
    };
    updateUser(dispatch, updatedUser, id, user?.accessToken, user?.refreshToken);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setUrl(reader.result)
      console.log(url)
    };
  };
  const removePreviewSrc = () => {
    setUrl("")
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="edit-form"
        data-testid="editForm"
      >
        <section className="edit-container">
          <div className="close-container">
            <p className="close-x" onClick={() => setEdit(false)}>
              X
            </p>
            <button type="submit" className="close">
              SAVE
            </button>
          </div>
          <div className="edit-profile"> Edit Profile </div>
          <div className="input-container">
            <InputField
              type="text"
              data={user.name}
              setData={setName}
              label="Display name"
            />
            <InputField
              inputType="textarea"
              data={user.about}
              setData={setAbout}
              classStyle="input-about"
              label="About"
            />
            <label> Profile Picture </label>
            <label className="makepost-file-label">
              <input
                type="file"
                id="fileInput"
                name="image"
                onChange={handleFileInputChange}
                className="makepost-img"
              />
            </label>
            {previewSource && (
              <div className="makepost-img-preview">
                <p className="remove-preview" onClick={removePreviewSrc}>
                  {" "}
                  X{" "}
                </p>
                <img src={previewSource} alt="chosen" />
              </div>
            )}
          </div>
        </section>
      </form>
    </>
  );
};

export default EditPage;
