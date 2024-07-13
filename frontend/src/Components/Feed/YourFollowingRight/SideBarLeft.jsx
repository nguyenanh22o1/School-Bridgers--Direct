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



const SideBarLeft = () => {
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
    let array = [];
    const newArray = [];

    // const searchUsername = async () => {
    //     await axios
    //         .get(`${baseURL}/user/following/${id}`, {
    //             headers: { token: `Bearer ${user.accessToken}` },
    //         }).then((res) => {
    //             if (result.length == 0) {
    //             } else {
    //                 setResulsts(res.data);
    //             }
    //         });

    //     for (let i = 0; i < result.length; i++) {
    //         await axios.get(`${baseURL}/user/${result[i]}`, {
    //             headers: { token: `Bearer ${user.accessToken}` },
    //         }).then((res1) => {
    //             array.push(res1.data);
    //         })
    //     }
    //     // console.log(array);
    //     // console.log(array);
    //     setFinalResult(array);
    //     // console.log(finalResult);
    // };





    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`${baseURL}/user/following/${id}`, {
                    headers: { token: `Bearer ${user.accessToken}` },
                }).then((res) => {
                    // res.data

                    for (let i = 0; i < res.data.length; i++) {
                        axios.get(`${baseURL}/user/${res.data[i]}`, {
                            headers: { token: `Bearer ${user.accessToken}` },
                        }).then((res1) => {
                            array.push(res1.data);
                        })
                    }
                    setFinalResult(array);
                });
        });
        console.log(array);
    }, []);


    return (
        // <FeedLayout>

        <div className="following">
            <img className="follower" src="https://cdn.discordapp.com/attachments/996407760109436978/1093875619277852742/image_2023-04-07_223005194-removebg-preview.png" alt="follower" />
            <div className="feed-username-display">
                {finalResult?.map((username) => {
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
                            <div className="text"> {username.username}</div>
                        </div>
                    );
                })}
            </div>


        </div>
        // </FeedLayout>

    );
};

export default SideBarLeft;
