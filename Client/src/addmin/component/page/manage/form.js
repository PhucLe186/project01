import classNames from 'classnames/bind';
import styles from './form.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Form({
    table,
    showFoodList,
    setShowFoodList,
    selectedFoods,
    food,
    toggleSelect,
    updateQuantity,
    handleBooking,
}) {
    const [selected, setSelected] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [note, setNote] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('');

    const totalPrice = selectedFoods.reduce((sum, item) => {
        const quantity = item.SoLuong || 1;
        return sum + item.ThanhTien * quantity;
    }, 0);
    const formData = {
        TenKhachHang: name,
        ID_Ban: selected,
        SoDienThoai: phone,
        SoLuong: number,
        ThoiGian: time,
        note: note,
        TongTien: totalPrice,
        ThanhTien: totalPrice,
        selectedFoods,
    };
    const handlesubmit = () => {
        handleBooking(formData);
        setName('');
        setNumber('');
        setPhone('');
        setNote('');
        setTime('');
        setNote('');
        setShowFoodList('');
    };
    return (
        <div className={cx('add-customer-form')}>
            <h3>Thêm Khách Hàng Mới</h3>
            <form className={cx('form-horizontal')} onSubmit={handlesubmit}>
                <div className={cx('form-grid')}>
                    <div className={cx('form-col')}>
                        <input
                            type="text"
                            name="TenKhachHang"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên khách hàng"
                        />
                        <input
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            onChange={(e) => setTime(e.target.value)}
                            name="ThoiGian"
                        />

                        <input
                            type="number"
                            name="SoLuong"
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Số lượng"
                            min={1}
                        />
                    </div>
                    <div className={cx('form-col')}>
                        <input
                            type="tel"
                            name="SoDienThoai"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Số điện thoại"
                        />
                        <select className={cx('select')} value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <option value="">--Chọn bàn--</option>
                            {table?.map((item, idx) => (
                                <option key={idx} value={item.ID_Ban}>
                                    {item.TenBan}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="note"
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Ghi chú"
                        />
                    </div>
                </div>

                <div className={cx('parent')}>
                    <div className={cx('money-input-container')}>
                        {selectedFoods.length > 0 ? (
                            <table className={cx('food-table')}>
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên món</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedFoods.map((food, i) => (
                                        <tr key={i}>
                                            <td>
                                                <img src={food.HinhAnhMon} alt={food.TenMonAn} />
                                            </td>
                                            <td>{food.TenMonAn}</td>
                                            <td>
                                                <div className={cx('quantity-control')}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateQuantity(food.ID_MonAn, -1);
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{food.SoLuong}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateQuantity(food.ID_MonAn, +1);
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <button
                                type="button"
                                className={cx('money-add-button')}
                                onClick={() => setShowFoodList(true)}
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>
                {showFoodList === true && (
                    <div className={cx('menu-overlay')}>
                        <div className={cx('menu')}>
                            <h2>chọn món ăn</h2>
                            <div className={cx('menu-list')}>
                                {food.map((item) => (
                                    <div
                                        key={item.ID_MonAn}
                                        className={cx(
                                            'menu-item',
                                            {
                                                selected: selectedFoods.some((i) => i.ID_MonAn === item.ID_MonAn),
                                            },
                                            { disabled: item.TrangThai === 'hết' },
                                        )}
                                        onClick={() => toggleSelect(item)}
                                    >
                                        <img src={item.HinhMonAn} alt={item.TenMonAn} />
                                        <h4>{item.TenMonAn}</h4>
                                        <p>{Number(item.ThanhTien).toLocaleString()} VND</p>
                                    </div>
                                ))}
                            </div>
                            <button className={cx('button')} onClick={() => setShowFoodList(false)}>
                                thoat
                            </button>
                        </div>
                    </div>
                )}
                <div className={cx('button2')}>
                    {selectedFoods.length > 0 && (
                        <button
                            title="thêm món ăn"
                            className={cx('btn')}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowFoodList(true);
                            }}
                        >
                            +
                        </button>
                    )}
                    <div className={cx('total')}>
                        {selectedFoods.length > 0 && <p>tổng tiền: {totalPrice}</p>}
                        <button type="submit" className={cx('add-btn')}>
                            Thêm Khách Hàng
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
