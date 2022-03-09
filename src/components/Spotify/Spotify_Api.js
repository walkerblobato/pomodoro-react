import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spotify_authentication } from './Spotify_authentication';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

export const Spotify_Api = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("acessToken")) {
            setToken(localStorage.getItem("acessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios
        .get(PLAYLISTS_ENDPOINT, {
            headers: {
                authorization: "Bearer" + token,
            },
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <div>
            <FontAwesomeIcon icon={faHeadphones} className="navegation" onClick={handleGetPlaylists}/>
            <Spotify_authentication />
        </div>
    )
}