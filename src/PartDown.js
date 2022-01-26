import { useEffect, useState } from 'react';
import Botao from './Botao';

function PartDown() {
    const [time, upgradeTime] = useState(1500000)
    
    const addString = (time) => 
        // Retirando uma um número quando digito tiver mais de duas casas
        (time + " min");
    
    const upTime = () => {
        upgradeTime((time) => time + 60000);
    };

    const downTime = () => {
        upgradeTime((time) => time - 60000);
    };

    return (
        <div className="part-down">
            <div>
                <h4>Session Length</h4> 
                <div className="time">
                    <Botao clicou={upTime} className="setas">
                        #
                    </Botao>
                    <span className="time-minuts">{addString(Math.floor((time / 60000) % 60))}</span>
                    <Botao clicou={downTime}className="setas">
                        #
                    </Botao>
                </div> 
            </div>
            <div> 
                <h4>Break Length</h4>
                <div className="time">
                    <Botao clicou={upTime} className="setas">
                        #
                    </Botao>
                    <span className="time-minuts">{addString(Math.floor((300000 / 60000) % 60))}</span>
                    <Botao clicou={downTime} className="setas">
                        #
                    </Botao>
                </div> 
            </div>
        </div>
    )
}

export default PartDown