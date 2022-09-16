import Cronometro from '../Cronometro/Cronometro';
import PartDown from '../PartDown/PartDown';
import EmbedSpotify from '../EmbedSpotify/EmbedSpotify';
import { Information } from '../Information/Information';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHeadphones } from '@fortawesome/free-solid-svg-icons';


function Pagina() {

    const [newTime, updateNewTime] = useState(1500000);
    const [timeBreak, updateTimeBreak] = useState(300000);
    const [time, updateTime] = useState(newTime);
    const [running, updateRunning] = useState(false);
    const [runningTimeBreak, updateRunningTimeBreak] = useState(false);
    const [pause, updatePause] = useState(true);
    const [style, setStyle] = useState('notes');
    const [historico, setHistorico] = useState(false);
    const [openSpotify, setOpenSpotify] = useState(false);

    const [dados] = useState(() => {
        
        const dadosSalvos = JSON.parse(localStorage.getItem('ls_dados'));

        return dadosSalvos || [];
    })

    const startTime = () => {
        if (time > 0) {
            updateRunning(true);
            updatePause(false);
            setHistorico(false);

            if (runningTimeBreak === false) {
                inicialDateAndHour();
            }
        };
    };

    const resetTime = () => {
        if (time > 0) {
            dados.splice(dados.length - 1);
        }
        
        updatePause(true);
        updateTime(newTime);
        updateRunning(false);
    };


    const upTime = () => {
        if (running) return

        updateNewTime(() => newTime + 60000);
        updateTime(() => newTime + 60000);
    };

    const downTime = () => {
        if (running || newTime === 60000)  return;

        updateNewTime(() => newTime - 60000);
        updateTime(() => newTime - 60000);
    };

    const openNotes = () => {
        setStyle('notes2');
    }

    const closeNotes = () => {
        setStyle('notes');
    }

    const inicialDateAndHour = () => {
        dados.push({
            data: new Date().toLocaleDateString('pt-BR'),
            horaInicio: new Date().toLocaleTimeString('en-GB', { 
                hour: '2-digit', minute: '2-digit' 
            }),
            horaFim: null,
        });
    }

    const playSound = () => {
        const audio = document.querySelector('#audio');
        audio.play();
    }

    const upTimeBreak = () => {
        updateTimeBreak((time) => time + 60000);
    }

    const downTimeBreak = () => {
        if (timeBreak === 60000) return;

        updateTimeBreak((time) => time - 60000);  
    };

    useEffect(() => {

        let interval;

        const finishHour = () => {
            dados[dados.length - 1].horaFim = new Date().toLocaleTimeString('en-GB', { 
                hour: '2-digit', minute: '2-digit' 
            });
        }

        const pomodoroTimer = () => {
            interval = setInterval(() => {
                updateTime((time) => (time - 1000));
            }, (document.hidden && !openSpotify) ? 500 : 1000);
        }

        if (time === 0 && running === true) {
            playSound();
            updateTime(timeBreak);
            updateRunningTimeBreak(true);
            
            if (dados[dados.length - 1].horaFim === null) {
                finishHour();
            }
            
            if (time === 0 && runningTimeBreak){
                updateRunning(false);
                updateRunningTimeBreak(false);
                updateTime(newTime);
                playSound(); 
            }    
        }

        if (running && !pause && time > 0) {
            pomodoroTimer();
        };

        // Para limpar a variável interval quando uma das condições não forem atendidas
        return () => {
            clearInterval(interval);
        };

    }, [running, time, dados, newTime, pause, runningTimeBreak, timeBreak, openSpotify]);

    return (
        <main className='main'>

            <Information 
                style={style} 
                dados={dados} 
                historico={historico}
                click={closeNotes}  
                setHistorico={setHistorico} 
                runningTimeBreak={runningTimeBreak}
                running={running}/>
            
            <EmbedSpotify 
                className={openSpotify ? 'open-spotify' : 'close-spotify'}
                click={() => setOpenSpotify(false)}
                time={time}/>

            <div className='section-up'>

                <div className='texts'>

                    <div>
                        <FontAwesomeIcon 
                            icon={faHeadphones} 
                            className='navegation' 
                            onClick={() => setOpenSpotify(true)}/>
                    </div>

                    <FontAwesomeIcon 
                        icon={faBook}
                        className='navegation'  
                        onClick={openNotes} />
                </div>

                <h3 className='session'>{runningTimeBreak ? 'Break Length' : 'Session Length'}</h3>

                <Cronometro 
                    time={time} 
                    startTime={startTime}  
                    resetTime={resetTime} />

                <audio id='audio' src='/alarme.mp3'></audio>

            </div>

            <div>
                <PartDown
                    timeBreak={timeBreak} 
                    time={newTime} 
                    upTime={upTime} 
                    downTime={downTime} 
                    upTimeBreak={upTimeBreak}
                    downTimeBreak={downTimeBreak}/>
            </div>
        </main>
    )
}

export default Pagina;