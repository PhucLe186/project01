import classNames from 'classnames/bind';
import { FaChair } from 'react-icons/fa'; // Import icon bàn ghế
import styles from './staff.module.scss';

const cx = classNames.bind(styles);
function Staff() {
    // mockData.js
    const mockData = [
        { id: 'ban1', soBan: 1, tinhTrang: 0 }, // Trống
        { id: 'ban2', soBan: 2, tinhTrang: 1 }, // Đã đặt trước
        { id: 'ban3', soBan: 3, tinhTrang: 2 }, // Đang phục vụ
        { id: 'ban4', soBan: 4, tinhTrang: 3 }, // Đã hủy
    ];

    const getTinhTrangText = (tinhTrang) => {
        switch (tinhTrang) {
            case 0:
                return 'Trống';
            case 1:
                return 'Đã đặt trước';
            case 2:
                return 'Đang phục vụ';
            case 3:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    return (
        <div className={cx('so-do-ban')}>
            {mockData.map((ban) => (
                <div key={ban.id} className={cx(`ban ban-${ban.tinhTrang}`)}>
                    <FaChair size={40} className="ban-icon" />
                    <p>Bàn {ban.soBan}</p>
                    <p>{getTinhTrangText(ban.tinhTrang)}</p>
                </div>
            ))}
        </div>
    );
}

export default Staff;
