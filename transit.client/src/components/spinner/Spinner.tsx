import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Spinner.css';

const Spinner = () => {
    return (
        <div className={`spinner`}>
            <FontAwesomeIcon icon={faSpinner} spin/>
        </div>
    );
};

export {Spinner};