import classNames from 'classnames/bind';
import styles from './cart.module.scss';
import Button from '~/component/Button';
import routesconfig from '~/config/routes';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CartPage({ cartItems, getTotalPrice, updateCart }) {
    const [vouchers] = useState([
        { id: '1', name: 'Giảm 10%', type: 'percent', value: 10 },
        { id: '2', name: 'Giảm 50.000đ', type: 'fixed', value: 50000 },
    ]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-container')}>
                <h2 className={cx('cart-title')}>Giỏ Hàng</h2>
                <div className={cx('cart-container2')}>
                    {cartItems.map((item, idx) => (
                        <div key={idx} className={cx('cart-item')}>
                            <img src={item.HinhAnhMon} alt={item.name} className={cx('cart-item-image')} />
                            <div className={cx('cart-item-details')}>
                                <h3 className={cx('cart-item-name')}>{item.TenMonAn}</h3>
                                <p className={cx('cart-item-description')}>siêu ngon</p>
                                <p className={cx('cart-item-price')}>Giá: {item.ThanhTien * item.soLuong} VND</p>
                                <div className={cx('cart-item-controls')}>
                                    <button
                                        className={cx('cart-item-button', 'decrease')}
                                        onClick={() => updateCart('decrease', item)}
                                    >
                                        -
                                    </button>
                                    <span className={cx('cart-item-quantity')}>{item.soLuong}</span>
                                    <button
                                        className={cx('cart-item-button', 'increase')}
                                        onClick={() => updateCart('increase', item)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('voucher-select')}>
                    <label>Chọn voucher:</label>
                    <select defaultValue="">
                        <option value="">-- Không chọn --</option>
                        {vouchers.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('cart-total')}>
                    <h3>Tổng tiền: {getTotalPrice()} VND</h3>
                    <Button to={routesconfig.order}>Đặt Bàn</Button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
