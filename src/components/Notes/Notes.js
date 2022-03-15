import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';


export function Notes({ style, click, dados }) {

    const[valores, setValores] = useState('');
    const[newDados, setDados] = useState();

    useEffect(() => {
        const mostrarTextArea = window.localStorage.getItem('ls_valores');
        setValores(mostrarTextArea);
    }, ['ls_valores']);

    useEffect(() => {
        setDados(dados);
        localStorage.setItem('ls_dados', dados);
        const mostrarDados = window.localStorage.getItem('ls_dados');
        setDados(mostrarDados);
    }, ['ls_dados']);

    const handleChange = (event) => {
        setValores(event.target.value);
    }

    const armazenar = (chave, valor) => {
        localStorage.setItem(chave, valor);
    }

    const mostrarDados = () => {
        return dados.map((item, index) => 
        <li className="dados-historico" key={index}>
            {item.data} <span className="distancia">-</span> {item.horaInicio} <span className="distancia2">-</span> {item.horaFim ? item.horaFim : 'Running'}
        </li>)
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
                    {mostrarDados()}
                </ul>
            </div>
        </div>
    )
}