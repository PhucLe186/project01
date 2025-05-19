import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { useState, useEffect } from 'react';
import moment from 'moment/moment';

const cx = classNames.bind(styles);

function Manager() {
    const [bookings, setBookings] = useState([]);
    const [table, settable] = useState([]);

    const [selected, setSelected] = useState('');
    const [newBooking, setNewBooking] = useState({
        TenKhachHang: '',
        SoDienThoai: '',
        ThoiGian: '',
        ID_Ban: '',
        SoLuong: '',
        note: '',
        ThanhTien: '',
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/manage/');
                const datas = Object.values(response.data.datas);
                const item = datas.filter((data) => data.trangthai === 1);
                setBookings(item);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }

            const response = await axios.get('http://localhost:5000/book/table');
            const tableData = response.data;

            const List = Object.keys(tableData).map((key) => {
                return {
                    ID_Ban: key,
                    ...tableData[key],
                };
            });
            const list = List.filter((ban) => ban.TinhTrangBan === 0);
            const groups = {};
            list.forEach((item) => {
                if (!groups[item.Tang]) {
                    groups[item.Tang] = [];
                }
                groups[item.Tang].push(item);
            });
            settable(groups);
        };

        fetchBookings();
        const interval = setInterval(fetchBookings, 5000);
        return () => clearInterval(interval);
    }, []);
    console.log(bookings);

    const handleNewChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    const handleAddNew = () => {
        if (
            !newBooking.TenKhachHang ||
            !newBooking.SoDienThoai ||
            !newBooking.ThoiGian ||
            !newBooking.ID_Ban ||
            !newBooking.SoLuong ||
            !newBooking.note ||
            newBooking.ThanhTien === ''
        ) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        axios
            .post('http://localhost:5000/manage/add', newBooking)
            .then((response) => {
                setBookings([...bookings, { id: response.data.id, ...newBooking }]);
                setNewBooking({
                    TenKhachHang: '',
                    SoDienThoai: '',
                    ThoiGian: '',
                    ID_Ban: '',
                    SoLuong: '',
                    note: '',
                    ThanhTien: '',
                });
            })
            .catch((error) => console.error('Lỗi khi thêm mới:', error));
    };

    const handlePaymentSubmit = async (ID_chitietban) => {
        console.log(ID_chitietban);
        try {
            // Gửi toàn bộ thông tin đơn hàng
            const response = await axios.post(
                'http://localhost:5000/api/bills/addbill',
                {
                    orderId: ID_chitietban,
                },
                {
                    withCredentials: true,
                },
            );
            if (response.data.success) {
                alert('nhận bàn thành công');
            } else {
                alert('Đặt hàng thất bại: ' + (response.data.message || 'Lỗi không xác định'));
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
        }
    };
    return (
        <div className={cx('management-container')}>
            <h2>Lịch Đặt Bàn</h2>
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
                            <td>{booking.note}</td>
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
            <div className={cx('add-customer-form')}>
                <h3>Thêm Khách Hàng Mới</h3>
                <form
                    className={cx('form-horizontal')}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddNew();
                    }}
                >
                    <input
                        type="text"
                        name="TenKhachHang"
                        placeholder="Tên khách hàng"
                        value={newBooking.TenKhachHang}
                        onChange={handleNewChange}
                        required
                    />
                    <input
                        type="tel"
                        name="SoDienThoai"
                        placeholder="Số điện thoại"
                        value={newBooking.SoDienThoai}
                        onChange={handleNewChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="ThoiGian"
                        value={newBooking.ThoiGian}
                        onChange={handleNewChange}
                        required
                    />
                    <select
                        className={cx('select')}
                        value={selected}
                        onChange={(e) => {
                            setSelected(e.target.value);
                            setNewBooking({ ...newBooking, ID_Ban: e.target.value });
                        }}
                        required
                    >
                        <option value="" disabled>
                            -- Chọn bàn --
                        </option>
                        {Object.entries(table).map(([tang, bans]) => (
                            <optgroup key={tang} label={`Tầng ${tang}`}>
                                {bans.map((item, idx) => (
                                    <option key={idx} value={item.ID_Ban}>
                                        {item.TenBan}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="SoLuong"
                        placeholder="Số lượng"
                        value={newBooking.SoLuong}
                        onChange={handleNewChange}
                        min={1}
                        required
                    />
                    <input
                        type="text"
                        name="note"
                        placeholder="Ghi chú"
                        value={newBooking.note}
                        onChange={handleNewChange}
                    />
                    <div className={cx('money-input-container')}>
                        <input
                            type="number"
                            name="ThanhTien"
                            placeholder=""
                            value={newBooking.ThanhTien}
                            onChange={handleNewChange}
                            className={cx('money-input')}
                        />
                        <button type="button" className={cx('money-add-button')} onClick={() => alert('Thêm món')}>
                            +
                        </button>
                    </div>
                    <button className={cx('add-btn')} type="submit">
                        Thêm Khách Hàng
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Manager;
