import axios from 'axios';
import { useState, useEffect } from 'react';
import TableForm from './order';
import { useNavigate } from 'react-router-dom';
import routesconfig from '~/config/routes';

function Order() {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCart = async () => {
            try {
                setVoucher(null);
                const res = await axios.get('http://localhost:5000/cart/', { withCredentials: true });
                const cartData = res.data;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        ID_MonAn: key,
                        ...cartData[key],
                    };
                });
                setCartItems(cartItemsArray);

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
                setData(groups);

                const money = await axios.get('http://localhost:5000/voucher/apply', { withCredentials: true });
                if (money.data.success) {
                    setVoucher(money.data.lastmoney);
                }
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy dữ liệu');
            }
        };

        fetchCart();
    }, []);
    console.log(voucher);
    const getTotalPrice = cartItems.reduce((total, item) => total + item.ThanhTien * item.soLuong, 0);

    const booktable = async (formData) => {
        try {
            const infor = await axios.post('http://localhost:5000/book/book', formData, { withCredentials: true });
            if (infor.data.success) {
                alert('đặt bàn thành công');
                navigate(routesconfig.checkout);
                setVoucher(null);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'lỗi lấy dữ liệu');
        }
    };

    const deleteItem = async (item) => {
        console.log('ID món ăn cần xóa:', item.ID_MonAn);
        if (!item.ID_MonAn) {
            console.error(' Lỗi: ID món ăn không hợp lệ');
            return;
        }
        try {
            await axios.post(
                'http://localhost:5000/cart/delete',
                { ID_MonAn: item.ID_MonAn, SoLuong: item.soLuong },
                { withCredentials: true },
            );

            setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.ID_MonAn !== item.ID_MonAn));
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa món');
        }
    };
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

    return (
        <TableForm
            data={data}
            cartItems={cartItems}
            onClick={deleteItem}
            getTotalPrice={getTotalPrice}
            voucher={voucher}
            booktable={booktable}
            updateCart={updateCart}
        />
    );
}

export default Order;
