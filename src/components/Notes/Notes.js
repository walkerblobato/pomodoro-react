import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Botao from '../Botao/Botao';


export function Notes({ style, click, dados }) {

    const[valores, setValores] = useState('');
    
    let novosDados = [];
    novosDados.push(dados)

    localStorage.setItem('ls_dados', JSON.stringify(novosDados));
    novosDados = JSON.parse(window.localStorage.getItem('ls_dados'));
    
    useEffect(() => {
        const mostrarTextArea = window.localStorage.getItem('ls_valores');
        setValores(mostrarTextArea);
    }, ['ls_valores']);

    useEffect(() => {
        return
    }, ['ls_dados']);

    const handleChange = (event) => {
        setValores(event.target.value);
    }

    const armazenar = (chave, valor) => {
        localStorage.setItem(chave, valor);
    }

    const mostrarDados = () => {
        return 
    }

    const limparHistorico = () => {
        localStorage.removeItem('ls_dados');
        mostrarDados.splice()
    }

    return (
        <div className={style}>
            <div className="part-left">
                <h3>Notes</h3>
                <textarea value={valores} onChange={handleChange} className="text"></textarea>
                <FontAwesomeIcon onClick={() => armazenar('ls_valores', valores)} icon={faSave} className="salvar-textarea" />
            </div>
            <div className="part-right">
                <div className="ajuste-h3">
                    <h3>Historic</h3>
                    <span className="sair" onClick={click}>x</span>
                </div>
                <div className="tabela-historico">
                    <h4>Date</h4>
                    <h4>Start time</h4>
                    <h4>End Time</h4>
                </div>
                <ul className="historico">
                    {novosDados.map((item, index) => 
                    <li className="dados-historico" key={index}>
                        {item.data} <span className="distancia">:</span> {item.horaInicio} <span className="distancia2">-</span> {item.horaFim ? item.horaFim : 'Running'}
                    </li>)}
                </ul>
                <Botao className="limpar" onClick={() => limparHistorico()}>Limpar</Botao>
            </div>
        </div>
    )
}