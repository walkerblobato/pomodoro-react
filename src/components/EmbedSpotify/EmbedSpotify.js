function EmbedSpotify({ className, click }) {

    return (
        <div className={className}>
            <iframe title="spotify" src="https://open.spotify.com/embed/playlist/1qvW13XhfMMZMlzQx362HR?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <div 
                className="button-close-spotify"
                onClick={click}>
                    FECHAR
            </div>
        </div>      
    )
}

export default EmbedSpotify;
