import Header from '~/user/component/mainlayout/Header';
import Footer from '~/user/component/mainlayout/Footer';
import classNames from 'classnames/bind';
import styles from './default.module.scss';

const cx = classNames.bind(styles);
function Default({ children }) {
    return (
        <div>
            <Header></Header>
            <div className={cx('parent')}>{children}</div>
            <Footer></Footer>
        </div>
    );
}

export default Default;
