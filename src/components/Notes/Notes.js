export function Notes({ style, click, dados }) {

    // localStorage.setItem(dados);

    return (
        <div className={style}>
            <div className="part-left">
                <h3>Anotações</h3>
                <textarea className="text"></textarea>
            </div>
            <div className="part-right">
                <div className="ajuste-h3">
                    <h3>Histórico</h3>
                    <h3 className="sair" onClick={click}>x</h3>
                </div>
                <div className="tabela-historico">
                    <h4>Hora Início</h4>
                    <h4>Hora Fim</h4>
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