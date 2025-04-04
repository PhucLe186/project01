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
    const [editingId, setEditingId] = useState(null);
    const [editedBooking, setEditedBooking] = useState({
        id: '',
        TenKhachHang: '',
        SoDienThoai: '',
        ThoiGian: '',
        ID_Ban: '',
        SoLuong: '',
        note: '',
        ThanhTien: '',
    });
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
                const response = await axios.get('http://localhost:5000/manage');
                setBookings(Object.values(response.data));
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

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/manage/delete/${id}`)
            .then(() => setBookings(bookings.filter((booking) => booking.id !== id)))
            .catch((error) => console.error('Lỗi khi xóa:', error));
    };

    const handleEdit = (booking) => {
        setEditingId(booking.id);
        setEditedBooking(booking);
    };

    const handleSave = () => {
        axios
            .put('http://localhost:5000/manage/update', editedBooking)
            .then(() => {
                setBookings(bookings.map((b) => (b.id === editedBooking.id ? editedBooking : b)));
                setEditingId(null);
            })
            .catch((error) => console.error('Lỗi khi cập nhật:', error));
    };

    const handleChange = (e) => {
        setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
    };

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
            newBooking.ThanhTien === '' // Kiểm tra Thành Tiền là số và không để trống
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

    return (
        <div className={cx('management-container')}>
            <h2>Quản Lý Đặt Bàn</h2>
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
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="text"
                                        name="TenKhachHang"
                                        value={editedBooking.TenKhachHang}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    booking.TenKhachHang
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="tel"
                                        name="SoDienThoai"
                                        value={editedBooking.SoDienThoai}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    booking.SoDienThoai
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="datetime-local"
                                        name="ThoiGian"
                                        value={editedBooking.ThoiGian}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    moment(booking.ThoiGian).format('HH:mm DD-MM-YYYY')
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="text"
                                        name="ID_Ban"
                                        value={editedBooking.TenBan}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    booking.TenBan
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="number"
                                        name="SoLuong"
                                        value={editedBooking.SoLuong}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    booking.SoLuong
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input type="text" name="note" value={editedBooking.note} onChange={handleChange} />
                                ) : (
                                    booking.note
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="number"
                                        name="ThanhTien"
                                        value={editedBooking.ThanhTien}
                                        onChange={handleChange}
                                    />
                                ) : booking.ThanhTien ? (
                                    booking.ThanhTien.toLocaleString()
                                ) : (
                                    '0'
                                )}
                                VND
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <button className={cx('save-btn')} onClick={handleSave}>
                                        Lưu
                                    </button>
                                ) : (
                                    <button className={cx('edit-btn')} onClick={() => handleEdit(booking)}>
                                        Sửa
                                    </button>
                                )}
                                <button className={cx('delete-btn')} onClick={() => handleDelete(booking.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('add-customer-form')}>
                <h3>Thêm Khách Hàng Mới</h3>
                <input
                    type="text"
                    name="TenKhachHang"
                    placeholder="Tên khách hàng"
                    value={newBooking.TenKhachHang}
                    onChange={handleNewChange}
                />
                <input
                    type="tel"
                    name="SoDienThoai"
                    placeholder="Số điện thoại"
                    value={newBooking.SoDienThoai}
                    onChange={handleNewChange}
                />
                <input type="datetime-local" name="ThoiGian" value={newBooking.ThoiGian} onChange={handleNewChange} />
                <select className={cx('select')} value={selected} onChange={(e) => setSelected(e.target.value)}>
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
                />
                <input
                    type="text"
                    name="note"
                    placeholder="Ghi chú"
                    value={newBooking.note}
                    onChange={handleNewChange}
                />
                <input
                    type="number"
                    name="ThanhTien"
                    placeholder="Thành tiền (VND)"
                    value={newBooking.ThanhTien}
                    onChange={handleNewChange}
                />
                <button className={cx('add-btn')} onClick={handleAddNew}>
                    Thêm Khách Hàng
                </button>
            </div>
        </div>
    );
}

export default Manager;
