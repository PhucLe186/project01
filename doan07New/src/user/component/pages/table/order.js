import classNames from 'classnames/bind';
import styles from './table.module.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function TableForm({ data, cartItems, onClick, getTotalPrice, voucher, booktable, updateCart }) {
    const [selected, setSelected] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');
    const [note, setNote] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const formData = {
        TenKhachHang: name,
        ID_Ban: selected,
        SoDienThoai: phone,
        SoLuong: number,
        ThoiGian: time,
        note: note,
        TongTien: voucher !== null ? voucher : getTotalPrice,
        ThanhTien: getTotalPrice,
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        booktable(formData);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart')}>
                <div className={cx('cart-item')}>
                    <table className={cx('cart-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Món ăn</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img src={item.HinhAnhMon} alt={item.name} className={cx('food-image')} />{' '}
                                        {item.TenMonAn}
                                    </td>
                                    <td>{Number(item.ThanhTien).toLocaleString('vi-VN')} đ</td>
                                    <td>
                                        <button
                                            className={cx('btn')}
                                            onClick={() => {
                                                updateCart('decrease', item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className={cx('quantity')}>{item.soLuong}</span>

                                        <button
                                            className={cx('btn')}
                                            onClick={() => {
                                                updateCart('increase', item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </td>
                                    <td>{(item.ThanhTien * item.soLuong).toLocaleString()} đ</td>
                                    <td>
                                        <div className={cx('delete')}>
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    onClick(item);
                                                }}
                                                className={cx('delete-btn')}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cx('total')}>
                <h3 className={cx('number')}>Thành tiền: {getTotalPrice.toLocaleString()} VND</h3>
                <h3 className={cx('number')}>
                    đã giảm: {voucher !== null ? (getTotalPrice - voucher).toLocaleString() : 0} VND
                </h3>
                <h3 className={cx('number')}>
                    Tổng Tiền: {voucher !== null ? voucher.toLocaleString() : getTotalPrice.toLocaleString()} VND
                </h3>
            </div>
            <div className={cx('form')}>
                <h2 className={cx('text')}> THÔNG TIN ĐẶT BÀN</h2>
                <form className={cx('parent')} onSubmit={handlesubmit} method="POST">
                    <div className={cx('inner')}>
                        <input
                            className={cx('input')}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="nhập họ và tên...."
                            required
                        />
                        <select
                            className={cx('select')}
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setIsOpen(false)}
                        >
                            {!isOpen && <option value="">--Chọn bàn--</option>}
                            {Object.entries(data).map(([tang, bans]) => (
                                <optgroup key={tang} label={`Tầng ${tang}`}>
                                    {bans.map((item, idx) => (
                                        <option key={idx} value={item.ID_Ban}>
                                            {item.TenBan}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className={cx('inner')}>
                        <input
                            min="1"
                            max="50"
                            step="1"
                            className={cx('input')}
                            type="number"
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="nhập số lượng"
                            required
                        />
                        <input
                            className={cx('input')}
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="số điện thoại"
                            required
                        />
                        <input
                            className={cx('input')}
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>
                    <textarea
                        rows="5"
                        cols="50"
                        className={cx('note')}
                        placeholder="Nhập ghi chú..."
                        maxLength="200"
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                    <button className={cx('buton')} type="submit">
                        đặt bàn
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TableForm;
