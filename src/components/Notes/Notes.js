import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


export function Notes({ valores, handleChange, armazenar}) {
    return (
        <div className="notations">
            <h3>Notes</h3>
            <textarea value={valores} onChange={handleChange} className="text-area"></textarea>
            <FontAwesomeIcon onClick={() => armazenar('ls_valores', valores)} icon={faSave} className="save-textarea" />
        </div>
    )
}