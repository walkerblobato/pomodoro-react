import { clear } from '@testing-library/user-event/dist/clear';
import { useEffect, useState } from 'react';
import Botao from './Botao'


function Cronometro() {
    const[time, updateTime] = useState(1500000)  
    const[running, updateRunning] = useState(false)
    const[pause, updatePause] = useState(true)
    
    const addZero = (time) => 
        // Retirando uma um número quando digito tiver mais de duas casas
        ("0" + time).slice(-2);
    
    // Contagem do tempo
    const startTime = () => {
        updateRunning(true);
        updatePause(false); 
    };

    useEffect(() => {
        let interval

        if (running && !pause) {
            // Função para não executar função abaixo novamente ao clicar em start
            interval = setInterval(() => {
            updateTime((time) => time - 1000);
            }, 1000);
        };

        return () => {
            // Para parar executação do relógio quando apertar no reset
            clearInterval(interval);
        };

    }, [running, pause]);

    // Resetar tempo
    const resetTime = () => {
        updatePause(true)
        updateRunning(false)
        updateTime(1500000)
    }

    const upTime = () => {
        updateTime((time) => time + 60000);
    };

    const downTime = () => {
        updateTime((time) => time - 60000);
        
    };

    return (
        <div>
            <div className="cronometro">
                <span id='minuts'>{addZero(Math.floor((time / 60000) % 60))}</span>
                <span id='seconds'>{addZero(Math.floor((time / 1000) % 60))}</span>
            </div>
            <div className="botoes">
                <Botao clicou={startTime} className="botoes-principais">
                    Start
                </Botao>
                <Botao clicou={resetTime} className="botoes-principais">
                    Reset
                </Botao>
            </div>
        </div>
        

    )
}

export default Cronometro;