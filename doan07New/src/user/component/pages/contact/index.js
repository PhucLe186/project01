import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('contact-full')}>
            <div className={cx('contact-box')}>
                <h2 className={cx('title')}>Liên Hệ Với Chúng Tôi</h2>
                <ul className={cx('info-list')}>
                    <li><FaPhoneAlt /> <span>0123 456 789</span></li>
                    <li><FaEnvelope /> <span>lienhe@nhahangabc.com</span></li>
                    <li><FaMapMarkerAlt /> <span>123 Đường Ẩm Thực, Quận 1, TP.HCM</span></li>
                    <li><FaClock /> <span>Thứ 2 - Chủ nhật: 9:00 - 22:00</span></li>
                </ul>
                <div className={cx('socials')}>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
