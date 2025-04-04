import React, { useEffect, useState } from 'react';
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
                setBills(traindata);
            })
            .catch((error) => {
                console.error('❌ Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
    console.log(bills);
    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Danh sách hóa đơn</h2>
            <Link to="/bills/add" className={cx('addButton')}>
                + Thêm hóa đơn
            </Link>

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
                <tbody>
                    {bills.length > 0 ? (
                        bills.map((bill, idx) => (
                            <tr key={idx}>
                                <td>{bill.ID_HoaDon}</td>
                                <td>{bill.TenKhachHang}</td>
                                <td>{bill.TenBan}</td>
                                <td className={cx(bill.status === 'Đã thanh toán' ? 'paid' : 'unpaid')}>
                                    {bill.trangthai}
                                </td>
                                <td>
                                    <Link to={`/bills/${bill.ID_HoaDon}`} className={cx('detailButton')}>
                                        Xem chi tiết
                                    </Link>
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
    );
};

export default BillList;
