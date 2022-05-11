import Cronometro from '../Cronometro/Cronometro';
import PartDown from '../PartDown/PartDown';
import { Notes } from '../Notes/Notes';
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
    
    
    if ((running) === false && time > 0)  {
        newTime = time;
    };

    const startTime = () => {
        if (time > 0) {
            updateRunning(true);
            updatePause(false);
            setHistorico(false);

            dados.push({
                data: new Date().toLocaleDateString('pt-BR'),
                horaInicio: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                horaFim: null,
            });
        };
    };

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            return 500;
        } 

        return 1000;
    });

    useEffect(() => {
        const audio = document.querySelector('#audio');

        if (time === 0 && running === true) {
            audio.play();

            dados[dados.length - 1].horaFim = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            updateRunning(false);
        }

        // Condiçõespara não executar função abaixo novamente ao clicar em start
        if (running && !pause && time > 0) {
            interval = setInterval(() => {
            updateTime((time) => (time - 1000));
            }, document.hidden ? 500 : 1000);
        };

        // Para limpar a variável interval quando uma das condições não forem atendidas
        return () => {
            clearInterval(interval);
        };

    }, [running, pause, time, dados]);

    // Resetar tempo
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

    return (
        <main>
            <Notes style={style} click={closeNotes} dados={dados} historico={historico} setHistorico={setHistorico} />
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