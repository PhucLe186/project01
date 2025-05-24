import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('overlay')}>
                <div className={cx('container')}>
                    <div className={cx('about')}>
                        <h2 className={cx('logo')}>Xiangyuan</h2>
                        <p>
                            Nhà hàng chúng tôi luôn luôn đặt khách lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi
                nghiệm tuyệt vời nhất. Các món ăn với các công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực
                khách. Xiangyuan xin chân thành cảm ơn.
                        </p>
                        <div className={cx('contactInfo')}>
                            <p><FaMapMarkerAlt /> 245 Nguyễn Thái Bình, Tân Bình, TP.HCM</p>
                            <p><FaPhone /> 0123 456 789</p>
                            <p><FaEnvelope /> Xiangyuan@nhahang.com</p>
                        </div>
                        <div className={cx('socials')}>
                            <a href="https://www.facebook.com/pthn.4404/" target='blank'><FaFacebookF /></a>
                            <a href="#"><FaInstagram /></a>
                        </div>
                    </div>

                    <div className={cx('links')}>
                        <div>
                            <h4>Hướng dẫn</h4>
                            <ul>
                                <li>Đăng ký thành viên</li>
                                <li>Thanh toán</li>
                                <li>Đặt bàn</li>
                                <li>Hỗ trợ khách hàng</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Chính sách</h4>
                            <ul>
                                <li>Thành viên</li>
                                <li>Bảo mật</li>
                                <li>Quà tặng</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Thông tin</h4>
                            <ul>
                                <li>Trang chủ</li>
                                <li>Giới thiệu</li>
                                <li>Menu</li>
                                <li>Liên hệ</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
