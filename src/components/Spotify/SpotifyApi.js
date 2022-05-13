import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect} from 'react';
import axios from 'axios';
import { SpotifyAuth } from './SpotifyAuth'

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/audio-features?ids=37i9dQZF1DX29n3b5fqT2P";

export const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
  });

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
}

export const SpotifyApi = () => {
    //const[playlists, setPlaylists] = useState(null);

    useEffect(() => {
        apiClient.get("me/playlists/").then(function (response) {
        //setPlaylists(response.data.items);
        console.log(response.data.items[0]);
        });
    }, []);

  
    /*
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios
        .get(PLAYLISTS_ENDPOINT, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        .then((response) => {
            setData(response.data);
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        });
    };
    
    
    */

    return (
        <div>
            <FontAwesomeIcon icon={faHeadphones} className="navegation" />
            <SpotifyAuth />
        </div>
    );
}

export default setClientToken;