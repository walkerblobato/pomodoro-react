import { useState, useEffect } from 'react';
import { Notes } from '../Notes/Notes';
import { Historic } from '../Historic/Historic'


export function Information(props) {

    const { style, click, dados, historico, setHistorico, time } = props
    const [valores, setValores] = useState('');

    if (time === 0 && dados.map((item) => item.horaFim)) {
        localStorage.setItem('ls_dados', JSON.stringify(dados));
        JSON.parse(window.localStorage.getItem('ls_dados'));
    }
    
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
            <Historic click={click} mostrarDados={mostrarDados} limparHistorico={limparHistorico} />
            <Notes valores={valores} handleChange={handleChange} armazenar={armazenar} />
        </div>
    )
}