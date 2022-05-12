import Cronometro from '../Cronometro/Cronometro';
import PartDown from '../PartDown/PartDown';
import { Information } from '../Information/Information';
import { Spotify_Api } from '../Spotify/Spotify_Api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


let newTime;
let interval;

function Pagina() {
    const[time, updateTime] = useState(1500000); 
    const[running, updateRunning] = useState(false);
    const[pause, updatePause] = useState(true);
    const[style, setStyle] = useState("notes");
    const [historico, setHistorico] = useState(false);
    
    const [dados] = useState(() => {
        const dadosSalvos = JSON.parse(localStorage.getItem('ls_dados'));

        return dadosSalvos || [];
    })
     
    const startTime = () => {
        if (time > 0) {
            updateRunning(true);
            updatePause(false);
            setHistorico(false);
            inicialDateAndHour();       
        };
    };

    useEffect(() => {  
        if (time === 0 && running === true) {
            playSound();
            finishHour();
            updateRunning(false);
        }

        if (running && !pause && time > 0) {
            pomodoroTimer();
        };

        // Para limpar a variável interval quando uma das condições não forem atendidas
        return () => {
            clearInterval(interval);
        };

    }, [running, pause, time]);

    const resetTime = () => {
        if (time > 0) {
            dados.splice(dados.length - 1);
        }

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

    const sessionTime = () => {
        if ((running) === false && time > 0)  {
            newTime = time;
        };

        return newTime
    }

    const inicialDateAndHour = () => {
        dados.push({
            data: new Date().toLocaleDateString('pt-BR'),
            horaInicio: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            horaFim: null,
        });
    }

    const finishHour = () => {
        dados[dados.length - 1].horaFim = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }

    const pomodoroTimer = () => {
        interval = setInterval(() => {
        updateTime((time) => (time - 1000));
        }, document.hidden ? 500 : 1000);
    }

    const playSound = () => {
        const audio = document.querySelector('#audio');
        audio.play();
    }

    return (
        <main className="main">
            <Information style={style} click={closeNotes} dados={dados} historico={historico} setHistorico={setHistorico} />
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
                <PartDown time={sessionTime()} upTime={upTime} downTime={downTime}/>
            </div>
        </main>
    )
}

export default Pagina;