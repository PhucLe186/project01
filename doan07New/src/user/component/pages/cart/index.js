import { useState, useEffect } from 'react';
import axios from 'axios';
import CartPage from './cart';




function Cart() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get('http://localhost:5000/cart/', { withCredentials: true });
                const data = res.data
                const cartItemsArray = Object.keys(data).map((key) => {
                    return {
                        ID_MonAn: key,
                        ...data[key],
                    };
                });
            
                setCartItems(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchCart();

    }, []);
    console.log(cartItems)

   const updateCart = async (action, item) => {
        try {
            const update = await axios.post(
                'http://localhost:5000/cart/update',
                { action, ID_MonAn: item.ID_MonAn },
                { withCredentials: true },
            );
            if (update.data.success) {
                setCartItems((prev) =>
                    update.data.soLuong === 0
                        ? prev.filter((value) => value.ID_MonAn !== item.ID_MonAn) // Xóa món nếu số lượng = 0
                        : prev.map((value) =>
                              value.ID_MonAn === item.ID_MonAn ? { ...value, soLuong: update.data.soLuong } : value,
                          ),
                );
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa món');
        }
    };
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.ThanhTien * item.soLuong, 0);
    };

    return (

        <CartPage cartItems={cartItems} getTotalPrice={getTotalPrice} updateCart={updateCart}  />
        // <div className={cx('cart-container')}>
        //     <h2 className={cx('cart-title')}>Giỏ Hàng</h2>
        //     <div className={cx('cart-container2')}>
        //         {cartItems.map((item, idx) => (
        //             <div key={idx} className={cx('cart-item')}>
        //                 <img src={item.HinhAnhMon} alt={item.name} className={cx('cart-item-image')} />
        //                 <div className={cx('cart-item-details')}>
        //                     <h3 className={cx('cart-item-name')}>{item.TenMonAn}</h3>
        //                     <p className={cx('cart-item-description')}>siêu ngon</p>
        //                     <p className={cx('cart-item-price')}>Giá: {item.ThanhTien * item.soLuong} VND</p>
        //                     <div className={cx('cart-item-controls')}>
        //                         <button
        //                             className={cx('cart-item-button', 'decrease')}
        //                             onClick={() => decreaseQuantity(idx)}
        //                         >
        //                             -
        //                         </button>
        //                         <span className={cx('cart-item-quantity')}>{item.soLuong}</span>
        //                         <button
        //                             className={cx('cart-item-button', 'increase')}
        //                             onClick={() => increaseQuantity(idx)}
        //                         >
        //                             +
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        //     <div className={cx('cart-total')}>
        //         <h3>Tổng tiền: {getTotalPrice()} VND</h3>
        //         <Button to={routesconfig.order}>Đặt Bàn</Button>
        //     </div>
        // </div>
    );
}

export default Cart;
