import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import routesConfig from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './BackButton.module.scss';

const cx = classNames.bind(styles);
function Onback() {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === routesConfig.home) return null;

    return (
        <button className={cx('back-btn')} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );
}

export default Onback;
