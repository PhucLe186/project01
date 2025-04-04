import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './cart.module.scss';
import Button from '~/component/Button';
import routesconfig from '~/config/routes';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get('http://localhost:5000/cart/', { withCredentials: true });
                setCartItems(Object.values(res.data));
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchCart();
    }, []);

    const increaseQuantity = (idx) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === idx ? { ...item, quantity: item.SoLuong + 1 } : item)),
        );
    };
    const decreaseQuantity = (idx) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === idx && item.soLuong > 1 ? { ...item, quantity: item.soLuong - 1 } : item,
            ),
        );
    };
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.ThanhTien * item.soLuong, 0);
    };

    return (
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
                                    onClick={() => decreaseQuantity(idx)}
                                >
                                    -
                                </button>
                                <span className={cx('cart-item-quantity')}>{item.soLuong}</span>
                                <button
                                    className={cx('cart-item-button', 'increase')}
                                    onClick={() => increaseQuantity(idx)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('cart-total')}>
                <h3>Tổng tiền: {getTotalPrice()} VND</h3>
                <Button to={routesconfig.order}>Đặt Bàn</Button>
            </div>
        </div>
    );
}

export default Cart;
