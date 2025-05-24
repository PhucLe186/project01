import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function MenuItem({ to, title, onClick, icon, className, top }) {
    const [active, setActive] = useState(false);

    const handleclick = () => {
        if (onClick) {
            setActive(!active);
            onClick();
        }
    };
    return (
        <div className={cx('item')}>
            <NavLink
                className={(nav) =>
                    cx('list', { className }, { top }, { active: to || active === true ? nav.isActive : '' })
                }
                to={to}
                onClick={handleclick}
            >
                <span className={cx('title')}>{title}</span>
                {icon && (
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )}
            </NavLink>
        </div>
    );
}

export default MenuItem;
