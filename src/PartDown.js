import { useEffect, useState } from 'react';
import Botao from './Botao';
import Cronometro from './Cronometro'


function PartDown() {
    const [time_session, updateTime] = useState(1500000)
    const [time_break, updateTimeBreak] = useState(300000)

    
    const addString = (time) => 
        // Retirando uma um número quando digito tiver mais de duas casas
        (time + " min");
    
    const upTimeBreak = () => {
        updateTimeBreak((time) => time + 60000);
    }

    const downTimeBreak = () => {
        updateTimeBreak((time) => time - 60000);  
    };

    const upTime = () => {
        updateTime((time) => time + 60000);
    };

    const downTime = () => {
        updateTime((time) => time - 60000);  
    };

    return (
        <div className="part-down">
            <div>
                <h4>Session Length</h4> 
                <div className="time">
                    <Botao clicou={upTime} className="setas">
                        #
                    </Botao>
                    <span className="time-minuts">{addString(Math.floor((time_session / 60000) % 60))}</span>
                    <Botao clicou={downTime}className="setas">
                        #
                    </Botao>
                </div> 
            </div>
            <div> 
                <h4>Break Length</h4>
                <div className="time">
                    <Botao clicou={upTimeBreak} className="setas">
                        #
                    </Botao>
                    <span className="time-minuts">{addString(Math.floor((time_break / 60000) % 60))}</span>
                    <Botao clicou={downTimeBreak} className="setas">
                        #
                    </Botao>
                </div> 
            </div>
        </div>
    )
}

export default PartDown