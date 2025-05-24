import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './addbill.module.scss';
import classNames from 'classnames/bind';
import Onback from '~/component/BackButton';
import routesConfig from '~/config/routes';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddBill() {
    const [menu, setMenu] = useState([]);
    const [table, setTable] = useState([]);
    const [selected, setSelected] = useState([]);
    const [name, setName] = useState('');
    const [selectBan, setSelectBan] = useState('');
    const [number, setNumber] = useState('');
    const navigate= useNavigate()
    const totalPrice = selected.reduce((sum, item) => {
    const quantity = item.SoLuong || 1;
    return sum + item.ThanhTien * quantity;
    }, 0);


    const onProceed={
            name,
            number,
            selectBan,
            totalPrice,
            danhSachMon: selected
        };
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/menu/');
                const response = await axios.get('http://localhost:5000/book/table');

                const data = Object.keys(res.data.bigdata).map((key) => ({
                    ID_MonAn: key,
                    ...res.data.bigdata[key],
                }));
                
                const tableData = response.data;
                const List = Object.keys(tableData).map((key) => {
                    return {
                        ID_Ban: key,
                        ...tableData[key],
                    };
                });
                const Table= List.filter(item=>item.TinhTrangBan===0)
                setMenu(data);
                setTable(Table)
            } catch (err) {
                console.error('Lỗi lấy menu:', err);
            }
        };
        fetchMenu();
    }, []);
    console.log(menu)
  

    const toggleSelect = (item) => {
        setSelected((prev) =>
            prev.some((i) => i.ID_MonAn === item.ID_MonAn)
                ? prev.filter((i) => i.ID_MonAn !== item.ID_MonAn)
                : [...prev, {
          ID_MonAn: item.ID_MonAn,
          HinhAnhMon:item.HinhMonAn,
          TenMonAn: item.TenMonAn,
          ThanhTien: item.ThanhTien,
          SoLuong: 1
        }]
        );
    };

    const updateQuantity = (id, delta) => {
        setSelected((prev) =>
            prev
                .map((item) =>
                    item.ID_MonAn === id
                        ? { ...item, SoLuong: Math.max(1, item.SoLuong + delta) }
                        : item
                )
        );
    };
    

    const handleProceed = async() => {
        try {
            const res = await axios.post(
                'http://localhost:5000/book/booknow',
                   onProceed ,
                { withCredentials: true },
            );
            if (res.data.success) {
                alert('Đặt món thành công');
                navigate(routesConfig.billNow)
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
        }
    };
    
console.log(onProceed)

    return (
        <div className={cx('parent')}>
            
            <div className={cx('inner')}>
                <Onback back_btn2 />
                <h1>   ĐẶT BÀN </h1>
            </div>
            <div className={cx('order-container')} style={{ display: 'flex', gap: '20px' }}>
                {/* Left side: Form + Menu */}
                <div style={{ flex: 7, borderRight: '1px solid #ddd' }}>
                    <div className={cx('form-section')}>
                        <input
                            type="text"
                            placeholder="Tên khách"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            value={selectBan}
                            onChange={(e) => setSelectBan(e.target.value)}
                        >
                            <option value="">--Chọn bàn--</option>
                            {table.map((item, idx)=>(
                                    <option key={idx} value={item.ID_Ban}>
                                            {item.TenBan}
                                    </option>    
                            ))}
                                         
                        </select>
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
                    </div>
                    <div className={cx('menu-list')}>
                        {menu.map((item) => (
                            <div
                                key={item.ID_MonAn}
                                className={cx('menu-item', {
                                    selected: selected.some(i => i.ID_MonAn === item.ID_MonAn),
                                }, {disabled:item.TrangThai==='hết' })}
                                onClick={() => toggleSelect(item)}
                                
                            >
                                <img src={item.HinhMonAn} alt={item.TenMonAn} />
                                <h4>{item.TenMonAn}</h4>
                                <p>{Number(item.ThanhTien).toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right side: Selected items */}
                <div style={{ flex: 3 }} >
                    <h3>Danh sách món đã chọn</h3>
                    <div className={cx('item')}>
                        {selected.map((item) => (
                            <div key={item.ID_MonAn} className={cx('selected-item')}>
                                <span>{item.TenMonAn}</span>
                                <div>
                                    <button onClick={() => updateQuantity(item.ID_MonAn, -1)}>-</button>
                                    <span>{item.SoLuong}</span>
                                    <button onClick={() => updateQuantity(item.ID_MonAn, 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('select')}>
                        <div className={cx('total-section')}>
                            Tổng tiền: {totalPrice.toLocaleString()} VND
                          </div>
                        <button className={cx('next-btn')} onClick={handleProceed}>
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBill;
