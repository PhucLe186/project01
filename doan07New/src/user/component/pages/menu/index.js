import Menuitem from './menuitem/menuitem';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Menu() {
    const [menuItem, setMenuitem] = useState([]);
    const [selectedMon, setSelectedMon] = useState(null);
    const [Mon, setMon] = useState(null);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/menu/');
                const cartData = res.data.bigdata;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        ID_MonAn: key,
                        ...cartData[key],
                    };
                });
                setMenuitem(cartItemsArray);
                setSelectedMon(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchMenu();
    }, []);
    console.log(selectedMon);

    const Showitem = async (item) => {
        const itemm = selectedMon.find((list) => list.ID_MonAn === item.ID_MonAn);
        if (itemm) {
            setMon(itemm);
        }
        console.log(selectedMon);
    };

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
                setMon((prevMenu) =>
                    prevMenu && prevMenu.ID_MonAn === news.ID_MonAn
                        ? { ...prevMenu, SoLuong: res.data.SoLuong, TrangThai: res.data.TrangThai }
                        : prevMenu,
                );
            }
            alert('thêm món thành công');
        } catch (error) {
            alert(error.response?.data?.message || 'Thêm Thất bại');
        }
    };

    return (
        <div className={cx('menu')}>
            <Menuitem
                menuitem={menuItem}
                onClick={addcart}
                Mon={Mon}
                setSelectedMon={setSelectedMon}
                Showitem={Showitem}
            />
        </div>
    );
}
export default Menu;
