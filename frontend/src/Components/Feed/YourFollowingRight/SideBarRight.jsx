import InputField from "../../InputFields/Input";

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FeedLayout from "../../Feed/Layout/FeedLayout";
import useFetchData from "../../Hooks/useFetchData";
import { baseURL } from "../../../utils/listContainer";
import Loading from "../../Loading/Loading";
import Posts from "../../Posts/Posts";
import FullPost from "../../Posts/FullPost/FullPost";
import axios from "axios";
// import React, { useEffect } from 'react';
import "../YourFollowingRight/temp.css";




const SideBarRight = () => {
    const [search, setSearch] = useState("");
    const user = useSelector((state) => state.user.user?.currentUser);
    const navigate = useNavigate();
    let id = user.user?._id;
    const [result, setResulsts] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
    const [finalResult, setFinalResult] = useState([]);

    const goToProfile = (id) => {
        navigate("/user/" + id);
    };

    const handleString = (string) => {
        let start_index = 0;
        let end_index = 0;
        for (let i = 41; i < string.length; i++) {
            if (string.charAt(i) == ">") {
                start_index = i;
            }
            if (string.charAt(i) == "<") {
                end_index = i;
                break;
            }
        }
        return string.slice(start_index + 1, end_index);
    };

    const handleURL = (string) => {
        let start_index = 0;
        let end_index = 0;
        for (let i = 43; i < string.length; i++) {
            if (string.charAt(i) == "/") {
                start_index = i;
                break;
            }
        }
        for (let i = 44; i < string.length; i++) {
            if (string.charAt(i) == '"') {
                end_index = i;
                break;
            }
        }
        return string.slice(start_index, end_index);
    };

    let array = [];
    const newArray = [];



    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`${baseURL}/rank?limit=15`).then((res) => {
                    setFinalResult(res.data);
                });
            // array = result;

            // setFinalResult(array, () => {
            //     array = result;
            // });

        });

    }, [result]);


    return (
        // <FeedLayout>

        <div className="ranking">
            <img className="cup" src="https://cdn.discordapp.com/attachments/996407760109436978/1093870813570138183/cup.png" alt="logo" />
            <div className="feed-username-display">
                {finalResult?.map((core_id) => {
                    return (
                        <div
                            className="user-container"
                            onClick={() => window.location.href = "https://www.topuniversities.com/universities" + handleURL(core_id.title)}
                        >
                            <div className="number-in-ranking"> {core_id.rank_display}</div>
                            <img
                                style={{ backgroundColor: `${core_id.theme}` }}
                                src={"https://www.topuniversities.com" + core_id.logo}
                                alt="profile pic"
                                className="username-profile"
                            />
                            <div className="username"> {handleString(core_id.title)}</div>
                            <meta name="referrer" content="no-referrer" />
                        </div>
                    );
                })}
            </div>


        </div>
        // </FeedLayout>

    );
};

export default SideBarRight;
