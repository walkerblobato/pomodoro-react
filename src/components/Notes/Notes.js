import Botao from '../Botao/Botao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export function Notes({ style, click, dados }) {

    // localStorage.setItem(dados);

    return (
        <div className={style}>
            <div className="part-left">
                <h3>Notes</h3>
                <textarea className="text"></textarea>
                <FontAwesomeIcon icon={faSave} className="salvar-textarea"/>
            </div>
            <div className="part-right">
                <div className="ajuste-h3">
                    <h3>Historic</h3>
                    <span className="sair" onClick={click}>x</span>
                </div>
                <div className="tabela-historico">
                    <h4>Start time</h4>
                    <h4>End Time</h4>
                </div>
                <ul className="historico">
                    {dados.map((item, index) => <li className="dados-historico" key={index}>
                        {new Date(item.horaInicio).toLocaleTimeString('en-GB',  {hour: '2-digit', minute:'2-digit'})} <span className="distancia">-</span> {item.horaFim ? new Date(item.horaFim).toLocaleTimeString('en-GB',  {hour: '2-digit', minute:'2-digit'}) : 'Executando'}
                    </li>)}
                </ul>
            </div>
        </div>
    )
}