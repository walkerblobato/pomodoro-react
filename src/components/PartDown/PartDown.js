import { useState } from 'react';
import Botao from '../Botao/Botao';
import { MinutsDown} from '../MinutsDown/MinutsDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


function PartDown({ time, upTime, downTime }) {
    const [time_break, updateTimeBreak] = useState(300000)

    const upTimeBreak = () => {
        updateTimeBreak((time) => time + 60000);
    }

    const downTimeBreak = () => {
        updateTimeBreak((time) => time - 60000);  
    };

    return (
        <div className="part-down">
            <div>
                <h4>Session Length</h4> 
                <div className="time">
                    <Botao clicou={upTime} className="arrows">
                        <FontAwesomeIcon icon={faArrowUp} />
                    </Botao>
                    <MinutsDown time={time}/>
                    <Botao clicou={downTime}className="arrows">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </Botao>
                </div> 
            </div>
            <div> 
                <h4>Break Length</h4>
                <div className="time">
                    <Botao clicou={upTimeBreak} className="arrows">
                        <FontAwesomeIcon icon={faArrowUp} />
                    </Botao>
                    <MinutsDown time={time_break} />
                    <Botao clicou={downTimeBreak} className="arrows">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </Botao>
                </div> 
            </div>
        </div>
    )
}

export default PartDown