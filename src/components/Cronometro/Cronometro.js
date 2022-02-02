import Botao from '../Botao/Botao'
import { DigitsUp } from '../DigitsUp/DigitsUp'


function Cronometro({ time, startTime, resetTime }) {

    return (
        <div>
            <DigitsUp time={time}/>
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

export default Cronometro

