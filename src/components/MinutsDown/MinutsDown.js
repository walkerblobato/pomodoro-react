export function MinutsDown( {time} ) {
    const addString = (time) => 
        // Retirando uma um número quando digito tiver mais de duas casas
        (time + " min");

    return (
        <span className="time-minuts">{addString(Math.floor((time / 60000) % 60))} </span>
    )
}