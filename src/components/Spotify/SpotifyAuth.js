import Botao from '../Botao/Botao';
import React, { useEffect, useState } from 'react';
import { setClientToken } from './Spotify_Api';

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientId = "7d4162ab5fb94f79867df22e4f821eef";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"]

export const SpotifyAuth = ({}) => {  

    const [token, setToken] = useState("");

    useEffect(() => {
        // const hash é utilizada para pegar url a partir #
        const hash = window.location.hash;

        // Limpar URL
        window.location.hash="";
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(token);
            setClientToken(token);
        }
    }, []);
    
    const loginEndpoint = () => { 
        if (!token) {
        window.location = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
        )}&response_type=token&show_dialog=true`;
      } else {
          alert("Usuário já logado!");
      }
    }

    return (
        <Botao class="logar-spotify" onClick={loginEndpoint} token={token}>
            Login Spotify
        </Botao>
    )
}