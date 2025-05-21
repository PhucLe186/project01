import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BillList.module.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import PaymentModal from './PaymentModal';
import ShowCodPopup from './ShowCodPopup';

const cx = classNames.bind(styles);

const BillNow = () => {
    const [bills, setBills] = useState([]);
    const [showCodPopup, setShowCodPopup] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedNote, setSelectedNote] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedBillId, setSelectedBillId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [price, setPrice] = useState(null);
    const [cashGiven, setCashGiven] = useState('');

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:5000/manage', { withCredentials: true });
            if (res.data.success) {
                const list = res.data.datas;
                const data = list.filter((item) => item.trangthai === 2);
                const cartdata = Object.keys(data).map((key) => {
                    return {
                        ID_chitietban: key,
                        ...data[key],
                    };
                });
                const traindata = cartdata.map((order) => ({
                    ...order,
                    MonAn: Object.values(order.MonAn).map((mon) => mon.TenMonAn),
                }));
                setBills(traindata);
            }
        };
        fetchdata();
    }, []);

    const checkoutbutton = async (ID_ChiTietBan, paymentMethod) => {
        console.log('Gửi ID:', ID_ChiTietBan); // giúp debug

        try {
            const res = await axios.post(
                'http://localhost:5000/manage/checked',
                { ID_ChiTietBan, paymentMethod },

                { withCredentials: true },
            );
            if (res.data.success) {
                alert('Thanh toán thành công');
                setBills((prevBills) => prevBills.filter((bill) => bill.ID_ChiTietBan !== ID_ChiTietBan));
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Lịch Sử Đặt Bàn</h2>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx('headerRow')}>
                        <th className={cx('cell')}>Mã đơn</th>
                        <th className={cx('cell')}>Ngày đến</th>
                        <th className={cx('cell')}>Tổng tiền</th>
                        <th className={cx('cell')}>Bàn</th>
                        <th className={cx('cell')}>Món đã đặt</th>
                        <th className={cx('cell')}>Ghi Chú</th>
                        <th className={cx('cell')}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.length === 0 ? (
                        <tr>
                            <td colSpan="7" className={cx('noData')}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        bills.map((item, idx) => (
                            <tr key={idx} className={cx('dataRow')}>
                                <td className={cx('cell')}>{item.Ma_HoaDon}</td>
                                <td className={cx('cell')}>{moment(item.ThoiGian).format('HH:mm DD-MM-YYYY')}</td>

                                <td className={cx('cell')}>{Number(item.TongTien).toLocaleString()} VNĐ</td>
                                <td className={cx('cell')}>{item.table?.TenBan}</td>
                                <td className={cx('cell')}>
                                    <div className={cx('scrollCell')}>{item.MonAn.join(', ')}</div>
                                </td>
                                <td className={cx('cell')}>
                                    <button
                                        onClick={() => {
                                            setSelectedNote(item.note || 'Không có ghi chú');
                                            setShow(true);
                                        }}
                                    >
                                        xem
                                    </button>
                                </td>
                                <td className={cx('cell')}>
                                    <button
                                        onClick={() => {
                                            setSelectedBillId(item.ID_ChiTietBan);
                                            setShowPaymentModal(true);
                                            setPrice(item.TongTien);
                                        }}
                                    >
                                        Thanh toán
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {show === true && (
                <div className={cx('notePopup')}>
                    <h3>Ghi chú</h3>
                    <p>{selectedNote}</p>
                    <button onClick={() => setShow(false)}>Đóng</button>
                </div>
            )}
            {showPaymentModal && (
                <PaymentModal
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    setShowCodPopup={setShowCodPopup}
                    setShowPaymentModal={setShowPaymentModal}
                />
            )}

            {showCodPopup && (
                <ShowCodPopup
                    setShowCodPopup={setShowCodPopup}
                    price={price}
                    cashGiven={cashGiven}
                    setCashGiven={setCashGiven}
                    selectedBillId={selectedBillId}
                    checkoutbutton={checkoutbutton}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            )}
        </div>
    );
};

export default BillNow;
