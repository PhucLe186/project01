import Header from '~/user/component/mainlayout/Header';
import classNames from 'classnames/bind';
import styles from './default.module.scss';

const cx = classNames.bind(styles);
function Onlyheader({ children }) {
    return (
        <div>
            <Header></Header>
            <div className={cx('parent')}>{children}</div>
        </div>
    );
}

export default Onlyheader;
