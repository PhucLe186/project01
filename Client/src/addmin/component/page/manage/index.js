import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { useState, useEffect } from 'react';
import Form from './form';
import List from './list';

const cx = classNames.bind(styles);

function Manager() {
    const [selectedNote, setSelectedNote] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showFoodList, setShowFoodList] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [table, setTable] = useState([]);
    const [show, setShow] = useState(false);
    const [food, setFood] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/manage/');
                const datas = Object.values(response.data.datas);
                const item = datas.filter((data) => data.trangthai === 1);
                setBookings(item);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
            const res = await axios.get('http://localhost:5000/menu/');
            const data = Object.keys(res.data.bigdata).map((key) => ({
                ID_MonAn: key,
                ...res.data.bigdata[key],
            }));

            setFood(data);
            const response = await axios.get('http://localhost:5000/book/table');
            const tableData = response.data;

            const List = Object.keys(tableData).map((key) => {
                return {
                    ID_Ban: key,
                    ...tableData[key],
                };
            });
            const list = List.filter((ban) => ban.TinhTrangBan === 0);
            setTable(list);
        };

        fetchBookings();
        const interval = setInterval(fetchBookings, 5000);
        return () => clearInterval(interval);
    }, []);
    const handleBooking = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/manage/book', formData, { withCredentials: true });
            if (res.data.success) {
                alert('đăng ký thành công');
            }
        } catch (error) {
            console.log('error');
        }
    };

    const toggleSelect = (item) => {
        setSelectedFoods((prev) =>
            prev.some((i) => i.ID_MonAn === item.ID_MonAn)
                ? prev.filter((i) => i.ID_MonAn !== item.ID_MonAn)
                : [
                      ...prev,
                      {
                          ID_MonAn: item.ID_MonAn,
                          HinhAnhMon: item.HinhMonAn,
                          TenMonAn: item.TenMonAn,
                          ThanhTien: item.ThanhTien,
                          SoLuong: 1,
                      },
                  ],
        );
    };
    const updateQuantity = (id, delta) => {
        setSelectedFoods((prev) =>
            prev.map((item) => (item.ID_MonAn === id ? { ...item, SoLuong: Math.max(1, item.SoLuong + delta) } : item)),
        );
    };

    const handlePaymentSubmit = async (ID_chitietban) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/bills/addbill',
                {
                    orderId: ID_chitietban,
                },
                {
                    withCredentials: true,
                },
            );
            if (response.data.success) {
                alert('nhận bàn thành công');
            } else {
                alert('Đặt hàng thất bại: ' + (response.data.message || 'Lỗi không xác định'));
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
        }
    };
    return (
        <>
            <div className={cx('menu-list-overlay')}></div>
            <div className={cx('management-container')}>
                <h2>Lịch Đặt Bàn</h2>
                <List
                    bookings={bookings}
                    setSelectedNote={setSelectedNote}
                    setShow={setShow}
                    handlePaymentSubmit={handlePaymentSubmit}
                    show={show}
                    selectedNote={selectedNote}
                />

                {table && (
                    <Form
                        toggleSelect={toggleSelect}
                        food={food}
                        table={table}
                        setSelectedFoods={setSelectedFoods}
                        showFoodList={showFoodList}
                        setShowFoodList={setShowFoodList}
                        selectedFoods={selectedFoods}
                        updateQuantity={updateQuantity}
                        handleBooking={handleBooking}
                    />
                )}
            </div>
        </>
    );
}

export default Manager;
