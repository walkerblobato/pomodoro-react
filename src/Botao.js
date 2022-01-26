function Botao({clicou, children, ...props}) {
    return (
        // ...props pega todas as props passadas no Botao
        // children pega o que foi passado dentro do HTML do botão
        <button onClick={clicou} {...props}>
            {children} 
        </button>
    )
}

export default Botao

