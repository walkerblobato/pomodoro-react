import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Botao from '../Botao/Botao';


export function Notes({ style, click, dados, historico, setHistorico }) {

    const[valores, setValores] = useState('');
    
    localStorage.setItem('ls_dados', JSON.stringify(dados));
    JSON.parse(window.localStorage.getItem('ls_dados'));
   
    useEffect(() => {
        const mostrarTextArea = window.localStorage.getItem('ls_valores');
        setValores(mostrarTextArea);
    }, []);

    const handleChange = (event) => {
        setValores(event.target.value);
    }

    const armazenar = (chave, valor) => {
        localStorage.setItem(chave, valor);
    }

    const mostrarDados = () => {
        if (historico) {
            dados.splice(0, dados.length)
        }

        return ( 
        dados.map((item, index) => 
        <li className="historical-data" key={index}>
            {item.data} <span className="data-spacing1">:</span> {item.horaInicio} <span className="data-spacing2">-</span> {item.horaFim ? item.horaFim : 'Running'}
        </li>))
    }

    const limparHistorico = () => {
        localStorage.removeItem('ls_dados');
        setHistorico(true)
    }

    return (
        <div className={style}>
            <div className="part-left">
                <h3>Notes</h3>
                <textarea value={valores} onChange={handleChange} className="text-area"></textarea>
                <FontAwesomeIcon onClick={() => armazenar('ls_valores', valores)} icon={faSave} className="save-textarea" />
            </div>
            <div className="part-right">
                <div className="header">
                    <h3>Historic</h3>
                    <span className="go-out" onClick={click}>x</span>
                </div>
                <div className="historical-table">
                    <h4>Date</h4>
                    <h4>Start time</h4>
                    <h4>End Time</h4>
                </div>
                <ul className="historical-spacing">
                    {mostrarDados()}
                </ul>
                <Botao className="clean" onClick={() => limparHistorico()}>Clean</Botao>
            </div>
        </div>
    )
}