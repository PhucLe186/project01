import Menuitem from './menuitem/menuitem';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Menu() {
    const [menuItem, setMenuitem] = useState([]);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/menu/');
                const cartData = res.data;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        ID_MonAn: key,
                        ...cartData[key],
                    };
                });
                setMenuitem(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchMenu();
    }, []);

    const addcart = async (news) => {
        if (news.TrangThai === 'hết') {
            alert('Món ăn này đã hết hàng!');
            return;
        }
        try {
            const res = await axios.post(
                'http://localhost:5000/menu/add',
                {
                    ID_MonAn: news.ID_MonAn,
                    HinhAnhMon: news.HinhMonAn,
                    TenMonAn: news.TenMonAn,
                    ThanhTien: news.ThanhTien,
                },
                { withCredentials: true },
            );
            if (res.data.success) {
                setMenuitem((prevMenu) =>
                    prevMenu.map((item) =>
                        item.ID_MonAn === news.ID_MonAn
                            ? { ...item, SoLuong: res.data.SoLuong, TrangThai: res.data.TrangThai }
                            : item,
                    ),
                );
            }
            alert('thêm món thành công');
        } catch (error) {
            alert(error.response?.data?.message || 'Thêm Thất bại');
        }
    };

    return (
        <div className={cx('menu')}>
            <Menuitem menuitem={menuItem} onClick={addcart} />
        </div>
    );
}
export default Menu;
