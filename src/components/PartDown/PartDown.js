import Botao from '../Botao/Botao';
import { MinutsDown} from '../MinutsDown/MinutsDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


function PartDown(props) {
    
    const { time, upTime, downTime, upTimeBreak, downTimeBreak, timeBreak } = props;
    
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
                    <MinutsDown time={timeBreak} />
                    <Botao clicou={downTimeBreak} className="arrows">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </Botao>
                </div> 
            </div>
        </div>
    )
}

export default PartDown