import React, { useEffect } from 'react';

const CLIENT_ID = "7d4162ab5fb94f79867df22e4f821eef";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join("%20");

/*
http://localhost:3000/#access_token=BQAyCzWcm6IMbnwQ-DsAXkYlIDgt4NH1c5YXCWMsPvUorugElNepPjnyY_WhljxKqs7ojVeFnF0ES1OU3qRElNfqXvbJK5t-n_zayMk13ZccGKqxSHXpdc_zr-JrtOZLJiSJVEZBLcecjxFoS235mqbL14XvISUSKRA-Nm15kRrNxvg9SG07arym&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramsSplitUp;
};

export const Spotify_authentication = () => {
    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                expires_in,
                token_type,
            } = getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expires_in", expires_in);
        }
    });
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }
    return (
        <button onClick={handleLogin}>Login Spotify</button>
    )
}