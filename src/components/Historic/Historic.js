import Botao from '../Botao/Botao';


export function Historic({ limparHistorico, click, mostrarDados}) {
    return (
        <div className="historical">
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
    )
}