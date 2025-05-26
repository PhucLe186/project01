import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import moment from 'moment/moment';

const cx = classNames.bind(styles);

function List({ bookings, setSelectedNote, setShow, handlePaymentSubmit, show, selectedNote }) {
    return (
        <>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Khách</th>
                        <th>Số Điện Thoại</th>
                        <th>Giờ</th>
                        <th>Bàn</th>
                        <th>Số Lượng</th>
                        <th>Ghi Chú</th>
                        <th>Thành Tiền</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.TenKhachHang}</td>
                            <td>{booking.SoDienThoai}</td>
                            <td>{moment(booking.ThoiGian).format('HH:mm DD-MM-YYYY')}</td>
                            <td>{booking.table?.TenBan}</td>
                            <td>{booking.SoLuong}</td>
                            <td>
                                <button
                                    className={cx('delete-btn')}
                                    onClick={() => {
                                        setSelectedNote(booking.note || 'Không có ghi chú');
                                        setShow(true);
                                    }}
                                >
                                    xem ghi chú
                                </button>
                            </td>
                            <td>{booking.ThanhTien ? booking.ThanhTien.toLocaleString() : '0'} VND</td>
                            <td>
                                <button
                                    className={cx('delete-btn')}
                                    onClick={() => handlePaymentSubmit(booking.ID_ChiTietBan)}
                                >
                                    khách nhận bàn
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {show === true && (
                <div className={cx('notePopup')}>
                    <h3>Ghi chú</h3>
                    <p>{selectedNote}</p>
                    <button onClick={() => setShow(false)}>Đóng</button>
                </div>
            )}
        </>
    );
}

export default List;
