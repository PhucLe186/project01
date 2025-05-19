import { useState, useContext } from 'react';
import { AuthContext } from '~/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './menu/Menu';
import Menulist from './menu/MenuItem';
import routesConfig from '~/config/routes';
import styles from './slidebar.module.scss';
import classNames from 'classnames/bind';
import { faCaretDown, faCaretRight, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/component/Button';



const cx = classNames.bind(styles);

function Sildebar() {
    
    const [activeMenu, setActiveMenu] = useState(null);
    
    const navigate = useNavigate();
    const toggleMenu = (menuName) => {
        setActiveMenu((prev) => (prev === menuName ? null : menuName)); // Bật/tắt đúng menu
    };
    const { admin, logoutadmin } = useContext(AuthContext);
   

    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <div className={cx('logo')}>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <Menu>
                    <Menulist to={routesConfig.dashboard} title="thống kê"></Menulist>
                    <div>
                        <button onClick={() => toggleMenu('hoadon')} className={cx('dropdown-btn')}>
                            <Menulist
                                title="hóa đơn"
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
                                    <Menulist className to={routesConfig.billNow} title="hóa đơn hiện thời "></Menulist>
                                    <Menulist className to={routesConfig.billist} title="lịch sử hóa đơn "></Menulist>
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
                                    <Menulist className to={routesConfig.manage} title="Lịch đặt bàn"></Menulist>
                                    <Menulist className to={routesConfig.history} title="lịch sử đặt bàn"></Menulist>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Menulist to={routesConfig.member} title="khách hàng"></Menulist>
                    <Menulist to={routesConfig.staff} title="nhân viên"></Menulist>
                </Menu>
            </div>
            <div className={cx('logout')}>
                {admin ? 
                (<Button logout onClick={logoutadmin} to={routesConfig.loginadmin}>
                    đăng xuất
                </Button>):(<Button logout to={routesConfig.loginadmin}>
                    đăng nhập
                </Button>) }
            </div>
        </div>
    );
}

export default Sildebar;
