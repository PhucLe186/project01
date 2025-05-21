import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BillList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BillList = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/bills')
            .then((response) => {
                const table = response.data;
                const traindata = Object.keys(table).map((key) => {
                    return {
                        ID_HoaDon: key,
                        ...table[key],
                    };
                });
                const list = traindata.filter((item) => item.trangthai === 'Đã thanh toán');

                setBills(list);
            })
            .catch((error) => {
                console.error('❌ Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
    console.log(bills);
    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Lịch sử hóa đơn</h2>
            <Link to="/bills/add" className={cx('addButton')}>
                + Thêm hóa đơn
            </Link>

            <div className={cx('parent')}>
                <div className={cx('wrapper')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Khách hàng</th>
                                <th>Bàn</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {bills.length > 0 ? (
                                bills.map((bill, idx) => (
                                    <tr key={idx}>
                                        <td>{bill.ID_HoaDon}</td>
                                        <td>{bill.chitiet.TenKhachHang}</td>
                                        <td>{bill.ban.TenBan}</td>

                                        <td>
                                            <div
                                                className={cx(
                                                    'status',
                                                    bill.trangthai === 'Đã thanh toán' ? 'paid' : 'unpaid',
                                                )}
                                            >
                                                {bill.trangthai}
                                            </div>
                                        </td>

                                        <td>
                                            <Link to={`/bills/${bill.ID_HoaDon}`} className={cx('detailButton')}>
                                                chi tiết
                                            </Link>

                                            <button
                                                className={cx('printButton')}
                                                onClick={() => {
                                                    window.open(
                                                        `http://localhost:5000/api/bills/export-bill/${bill.ID_HoaDon}`,
                                                        '_blank',
                                                    );
                                                }}
                                            >
                                                <FaPrint /> In
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className={cx('noData')}>
                                        Không có hóa đơn nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillList;
