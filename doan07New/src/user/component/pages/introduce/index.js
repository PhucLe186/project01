import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClock, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import bg4Image from '~/asset/img/nhahanglau.jpg';
import lauTuxuyen from '~/asset/img/lautuxuyen.jpg';
import lauCuu from '~/asset/img/laucuubackinh.jpg';
import miHoanhThanh from '~/asset/img/mihoanhthanh.jpg';
import banhTroitau from '~/asset/img/banhtroitau.jpg';
import classNames from 'classnames/bind';
import styles from './introduce.module.scss';

const cx = classNames.bind(styles);

const Introduce = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const foodItems = [
        {
            image: lauTuxuyen,
            title: 'Lẩu Tứ Xuyên',
            description: 'Món lẩu cay nồng đặc trưng của vùng Tứ Xuyên',
        },
        {
            image: lauCuu,
            title: 'Lẩu Cửu Bảo Kinh',
            description: 'Lẩu thịt cừu truyền thống Bắc Kinh',
        },
        {
            image: miHoanhThanh,
            title: 'Mì Hoành Thánh',
            description: 'Món mì truyền thống với hoành thánh thơm ngon',
        },
        {
            image: banhTroitau,
            title: 'Bánh Trôi Tàu',
            description: 'Món tráng miệng truyền thống',
        },
    ];

    return (
        <div className={cx('introduce')}>
            <div className={cx('container')}>
                <div className={cx('section-title')} data-aos="fade-up">
                    <h2>Chào mừng đến với nhà hàng Xiangyuan</h2>
                    <p>Khám phá những món ăn độc đáo và trải nghiệm dịch vụ tuyệt vời tại nhà hàng của chúng tôi</p>
                </div>

                <div className={cx('features-grid')}>
                    <div className={cx('feature-card')} data-aos="fade-up" data-aos-delay="100">
                        <FontAwesomeIcon icon={faUtensils} className={cx('icon')} />
                        <h3>Ẩm thực đa dạng</h3>
                        <p>
                            Chúng tôi phục vụ nhiều món ăn ngon từ các nền ẩm thực khác nhau, đảm bảo sự hài lòng cho
                            mọi khẩu vị.
                        </p>
                    </div>

                    <div className={cx('feature-card')} data-aos="fade-up" data-aos-delay="200">
                        <FontAwesomeIcon icon={faClock} className={cx('icon')} />
                        <h3>Phục vụ nhanh chóng</h3>
                        <p>
                            Đội ngũ nhân viên chuyên nghiệp sẽ phục vụ bạn trong thời gian ngắn nhất với chất lượng tốt
                            nhất.
                        </p>
                    </div>

                    <div className={cx('feature-card')} data-aos="fade-up" data-aos-delay="300">
                        <FontAwesomeIcon icon={faStar} className={cx('icon')} />
                        <h3>Chất lượng cao cấp</h3>
                        <p>Nguyên liệu tươi ngon, được chọn lọc kỹ càng và chế biến theo tiêu chuẩn quốc tế.</p>
                    </div>

                    <div className={cx('feature-card')} data-aos="fade-up" data-aos-delay="400">
                        <FontAwesomeIcon icon={faUsers} className={cx('icon')} />
                        <h3>Đội ngũ chuyên nghiệp</h3>
                        <p>Đầu bếp và nhân viên phục vụ được đào tạo bài bản, luôn sẵn sàng phục vụ quý khách.</p>
                    </div>
                </div>

                <div className={cx('about-section')}>
                    <div className={cx('about-content')} data-aos="fade-right">
                        <h2>Về chúng tôi</h2>
                        <p>
                            Nhà hàng Xiangyuan là một điểm đến ẩm thực Trung Hoa nổi tiếng, được biết đến với thực đơn
                            phong phú các món ăn truyền thống và hiện đại. Không gian nhà hàng được thiết kế sang trọng,
                            ấm cúng, tạo cảm giác thoải mái cho thực khách. Xiangyuan chú trọng vào việc sử dụng nguyên
                            liệu tươi ngon, chất lượng cao, cùng với kỹ thuật chế biến tinh tế để mang đến những món ăn
                            đậm đà hương vị. Đội ngũ nhân viên chuyên nghiệp, nhiệt tình cũng là một điểm cộng lớn, góp
                            phần mang lại trải nghiệm ẩm thực tuyệt vời cho khách hàng.
                        </p>
                        <p>
                            Chúng tôi luôn nỗ lực không ngừng để cải thiện chất lượng dịch vụ và mang đến những món ăn
                            ngon nhất cho quý khách.
                        </p>
                        <a href="/menu" className={cx('btn')}>
                            Xem thực đơn
                        </a>
                    </div>
                    <div className={cx('about-image')} data-aos="fade-left">
                        <img src={bg4Image} alt="Nhà hàng của chúng tôi" />
                    </div>
                </div>

                <div className={cx('food-gallery')} data-aos="fade-up">
                    <h2>Món ăn đặc sắc</h2>
                    <div className={cx('gallery-grid')}>
                        {foodItems.map((item, index) => (
                            <div
                                key={index}
                                className={cx('gallery-item')}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <img src={item.image} alt={item.title} />
                                <div className={cx('overlay')}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
