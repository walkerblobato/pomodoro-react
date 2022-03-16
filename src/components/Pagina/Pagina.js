import Cronometro from '../Cronometro/Cronometro';
import PartDown from '../PartDown/PartDown';
import { Notes } from '../Notes/Notes';
import { Spotify_Api } from '../Spotify/Spotify_Api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


let newTime;
const dados = [];

function Pagina() {
    const[time, updateTime] = useState(1500000); 
    const[running, updateRunning] = useState(false);
    const[pause, updatePause] = useState(true);
    const[style, setStyle] = useState("notes");
    
    if ((running) === false && time > 0)  {
        newTime = time;
    };

    // Contagem do tempo
    const startTime = () => {
        if (time > 0) {
            updateRunning(true);
            updatePause(false);

            dados.push({
                data: new Date().toLocaleDateString('pt-BR'),
                horaInicio: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                horaFim: null,
            });
        };
    };

    useEffect(() => {
        let interval;
        const audio = document.querySelector('#audio');

        if (time === 0 && running === true) {
            audio.play();

            dados[dados.length - 1].horaFim = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            updateRunning(false);
        }

        if (running && !pause && time > 0) {
            // Função para não executar função abaixo novamente ao clicar em start
            interval = setInterval(() => {
            updateTime((time) => time - 1000);
            }, 1000);

        };

        return () => {
            // Para limpar a variável interval quando uma das condições não forem atendidas
            clearInterval(interval);
        };

    }, [running, pause, time]);

    // Resetar tempo
    const resetTime = () => {
        dados.splice(dados.length - 1);

        updatePause(true);
        updateRunning(false);
        updateTime(newTime);
    };

    const upTime = () => {
        if (running) return

        updateTime((time) => time + 60000);
    };

    const downTime = () => {
        if (running) return;
        
        if (time === 0) {
            return;
        };

        updateTime((time) => time - 60000);  
    };

    const openNotes = () => {
        setStyle("notes2");
    }

    const closeNotes = () => {
        setStyle("notes");
    }

    return (
        <main>
            <Notes style={style} click={closeNotes} dados={dados}/>
            <div className="section-up">
                <div className="texts">
                    <Spotify_Api />
                    <FontAwesomeIcon onClick={openNotes} icon={faBook} className="navegation" />
                </div>
                <h3 className="session">Session</h3>
                <Cronometro time={time} startTime={startTime} resetTime={resetTime} />
                <audio id="audio" src="/alarme.mp3"></audio>
            </div>
            <div>
                <PartDown time={newTime} upTime={upTime} downTime={downTime}/>
            </div>
        </main>
    )
}

export default Pagina;