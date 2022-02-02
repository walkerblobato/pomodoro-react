import Cronometro from '../Cronometro/Cronometro'
import PartDown from '../PartDown/PartDown'
import { useEffect, useState } from 'react';

let newTime

function Pagina() {
    const[time, updateTime] = useState(1500000); 
    const[running, updateRunning] = useState(false);
    const[pause, updatePause] = useState(true);

    if ((running) === false) {
        newTime = time
    }

    console.log(newTime)

    // Contagem do tempo
    const startTime = () => {
        updateRunning(true);
        updatePause(false); 
    };

    useEffect(() => {
        let interval

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
        updatePause(true)
        updateRunning(false)
        updateTime(newTime)
    }

    const upTime = () => {
        if (running) return

        updateTime((time) => time + 60000);
    };

    const downTime = () => {
        if (running) return
        
        updateTime((time) => time - 60000);
        
    };


    return (
        <main>
            <div className="section-up">
                <h3>Session</h3>
                <Cronometro time={time} startTime={startTime} resetTime={resetTime} />
            </div>
            <div>
                <PartDown time={newTime} upTime={upTime} downTime={downTime}/>
            </div>
        </main>
    )
}

export default Pagina