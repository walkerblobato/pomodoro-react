export function DigitsUp( {time} ) {
    const addZero = (time) => 
        // Retirando uma um número quando digito tiver mais de duas casas
        ("0" + time).slice(-2);

    return (
        <div className="cronometro">
            <span id='minuts'>{addZero(Math.floor((time / 60000) % 60))}</span>
            <span id='seconds'>{addZero(Math.floor((time / 1000) % 60))}</span>
        </div>
    )
}