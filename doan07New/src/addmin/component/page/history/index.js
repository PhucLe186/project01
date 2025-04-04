import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './history.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

const History = () => {
    const [tables, setTables] = useState([]);
    const [filteredTables, setFilteredTables] = useState([]);
    const [floor, setFloor] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // api sử dụng http://localhost:5000/manage
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('http://localhost:5000/manage');
                // Chỉ lấy những bàn đã đặt (status = 1)
                const data = response.data;
                const bookedTables = Object.keys(data)
                    .map((key) => {
                        return {
                            ID_chitietban: key,
                            ...data[key],
                        };
                    })
                    .filter((table) => parseInt(table.trangthai) !== 0)
                    .map((table) => ({
                        ...table,
                        trangthai: parseInt(table.trangthai),
                    }));
                setTables(bookedTables);
                setFilteredTables(bookedTables);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    useEffect(() => {
        let filtered = [...tables];

        // Lọc theo tầng
        if (floor !== 'all') {
            filtered = filtered.filter((table) => table.Tang === parseInt(floor));
        }

        setFilteredTables(filtered);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
    }, [floor, tables]);

    // Tính toán phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTables.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTables.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Đã đặt';
            case 2:
                return 'Đang phục vụ';
            case 3:
                return 'Đã hủy';
            default:
                return 'Chưa đặt';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 1:
                return 'booked';
            case 2:
                return 'serving';
            case 3:
                return 'cancelled';
            default:
                return '';
        }
    };

    return (
        <div className={cx('history')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2>Quản lý lịch sử đặt bàn</h2>
                    <div className={cx('filter-section')}>
                        <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                            <option value="all">Tất cả tầng</option>
                            <option value="1">Tầng 1</option>
                            <option value="2">Tầng 2</option>
                        </select>
                    </div>
                </div>

                <div className={cx('table-container')}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Bàn</th>
                                <th>Tên Bàn</th>
                                <th>tên khách hàng</th>
                                <th>số lượng</th>
                                <th>Tầng</th>
                                <th>Thời gian đặt</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((table) => (
                                <tr key={table.id}>
                                    <td>{table.ID_chitietban}</td>
                                    <td>{table.TenBan}</td>
                                    <td>{table.TenKhachHang}</td>
                                    <td>{table.SoLuong}</td>
                                    <td>{table.Tang}</td>
                                    <td className={cx('time')}>{moment(table.ThoiGian).format('HH:mm DD-MM-YYYY')}</td>
                                    <td>
                                        <span className={cx('status', getStatusClass(table.trangthai))}>
                                            {getStatusText(table.trangthai)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className={cx('pagination')}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Trước
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={cx({ active: currentPage === index + 1 })}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
