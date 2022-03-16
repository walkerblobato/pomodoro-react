import Botao from '../Botao/Botao';
import { DigitsUp } from '../DigitsUp/DigitsUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons';


function Cronometro({ time, startTime, resetTime }) {

    return (
        <div>
            <DigitsUp time={time}/>
            <div className="buttons">
                <Botao clicou={startTime} className="buttons-main">
                    <FontAwesomeIcon icon={faPlay} /><span className="start">Start</span>
                </Botao>
                <Botao clicou={resetTime} className="buttons-main">
                    <FontAwesomeIcon icon={faRepeat} /><span className="reset">Reset</span>
                </Botao>
            </div>
        </div>
    )
}

export default Cronometro

