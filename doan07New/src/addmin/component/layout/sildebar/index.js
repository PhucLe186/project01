import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Menu from './menu/Menu';
import Menulist from './menu/MenuItem';
import routesConfig from '~/config/routes';
import styles from './slidebar.module.scss';
import classNames from 'classnames/bind';
import { faCaretDown, faCaretRight, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function Sildebar() {
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setActiveMenu((prev) => (prev === menuName ? null : menuName)); // Bật/tắt đúng menu
    };
    return (
        <div className={cx('menu')}>
            <div className={cx('logo')}>
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <Menu>
                <Menulist to={routesConfig.admin} title="thống kê"></Menulist>

                <div>
                    <button onClick={() => toggleMenu('hoadon')} className={cx('dropdown-btn')}>
                        <Menulist
                            title="đặt bàn"
                            icon={activeMenu === 'hoadon' ? faCaretDown : faCaretRight}
                        ></Menulist>
                    </button>

                    <AnimatePresence>
                        {activeMenu === 'hoadon' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="dropdown-content"
                            >
                                <Menulist className to={routesConfig.billist} title="quản lý hóa đơn "></Menulist>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div>
                    <button onClick={() => toggleMenu('datban')} className={cx('dropdown-btn')}>
                        <Menulist
                            title="đặt bàn"
                            icon={activeMenu === 'datban' ? faCaretDown : faCaretRight}
                        ></Menulist>
                    </button>

                    <AnimatePresence>
                        {activeMenu === 'datban' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="dropdown-content"
                            >
                                <Menulist className to={routesConfig.Table} title="sơ đồ bàn"></Menulist>
                                <Menulist className to={routesConfig.manage} title="quản lý đặt bàn"></Menulist>
                                <Menulist className to={routesConfig.history} title="lịch sử đặt bàn"></Menulist>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Menulist to={routesConfig.member} title="khách hàng"></Menulist>
                <Menulist to={routesConfig.staff} title="nhân viên"></Menulist>
            </Menu>
        </div>
    );
}

export default Sildebar;
