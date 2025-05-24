import React from 'react';
import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('contact-wrapper')}>
            <div className={cx('contact-container')}>
                <div className={cx('contact-info')}>
                    <h2 className={cx('restaurant-name')}>Xiangyuan</h2>
                    <p className={cx('intro')}>
                        Nhà hàng chúng tôi luôn luôn đặt khách lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng
                        những trải nghiệm tuyệt vời nhất. <br />
                        Các món ăn với các công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. Xiangyuan xin
                        chân thành cảm ơn.
                    </p>
                    <p>
                        <FaMapMarkerAlt className={cx('icon')} /> 245 Nguyễn Thái Bình, Tân Bình, TP.HCM
                    </p>
                    <p>
                        <FaPhoneAlt className={cx('icon')} /> 0123 456 789
                    </p>
                    <p>
                        <FaEnvelope className={cx('icon')} /> Xiangyuan@nhahang.com
                    </p>
                    <div className={cx('social-icons')}>
                        <FaFacebook className={cx('social-icon')} />
                        <FaInstagram className={cx('social-icon')} />
                        <FaTiktok className={cx('social-icon')} />
                    </div>
                </div>
                <div className={cx('map-container')}>
                    <iframe
                        title="Xiangyuan Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0452901021174!2d106.66217997593228!3d10.806327889342492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed61c80dd65%3A0xd88eb03b0aeec9e2!2zMjQ1IE5ndXnhu4VuIFRo4bqhaSBCw6xuaCwgVMOibiBCw6xuaCwgVGjDoG5oIHBo4buRIEjDoCBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716361810832!5m2!1sen!2s"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Contact;
