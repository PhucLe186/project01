import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './table.module.scss';
import tbl from '~/asset/img/table.png';

const cx = classNames.bind(styles);

function App() {
    const [tables, setTables] = useState([]);
    const [search, setSearch] = useState({ Tang: '', TinhTrangBan: '' });
    const [newTable, setNewTable] = useState({ TenBan: '', TinhTrangBan: 0, Tang:'' });

    useEffect(() => {
        const fetchTables = async () => {
            const response = await axios.get('http://localhost:5000/tables');
            const data = response.data;
            const key = Object.keys(data).map((key) => {
                return {
                    ID_ban: key,
                    ...data[key],
                };
            });
            setTables(key);
        };
        fetchTables();
    }, []);

    const addTable = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tables/add', newTable);
            setTables([...tables, response.data]);
            setNewTable({ TenBan: '', TinhTrangBan: 0 });
        } catch (error) {
            console.error('Lỗi khi thêm bàn:', error);
        }
    };

    // const editTable = async (id, updatedInfo) => {
    //     try {
    //         const response = await axios.post(`http://localhost:5000/tables/${id}`, updatedInfo);
    //         setTables(tables.map((table) => (table.id === id ? response.data : table)));
    //     } catch (error) {
    //         console.error('Lỗi khi chỉnh sửa bàn:', error);
    //     }
    // };

    const deleteTable = async (table) => {
        try {
            await axios.post(`http://localhost:5000/tables/${table.ID_ban}/delete`);
            setTables(tables.filter((item) => item.ID_ban !== table.ID_ban));
        } catch (error) {
            console.error('Lỗi khi xóa bàn:', error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await axios.post(`http://localhost:5000/tables/${id}/status`, {
                status,
            });

            const updatedStatus = response.data;
            setTables(tables.map((table) => (table.id === id ? { ...table, status: updatedStatus.status } : table)));
        } catch (error) {
            console.error('Error updating table status:', error);
        }
    };

    const searchTables = async () => {
        try {
            const query = new URLSearchParams();
            if (search.Tang) query.append('number', search.Tang);
            if (search.TinhTrangBan) query.append('TinhTrangBan', search.TinhTrangBan);

            const response = await axios.get(`http://localhost:5000/tables/search?${query.toString()}`);
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'available';
            case 1:
                return 'reserved';
            case 2:
                return 'occupied';

            default:
                return 'Chưa đặt';
        }
    };
    return (
        <div className={cx('App')}>
            <h1>Quản Lý Bàn</h1>
            <div className={cx('search-bar')}>
                <input
                    type={cx('text')}
                    placeholder="Tầng"
                    value={search.Tang}
                    onChange={(e) => setSearch({ ...search, Tang: e.target.value })}
                />
                <select
                    value={search.TinhTrangBan}
                    onChange={(e) => setSearch({ ...search, TinhTrangBan: e.target.value })}
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="0">Còn trống</option>
                    <option value="1">Đã đặt</option>
                    <option value="2">Đang phục vụ</option>
                </select>
                <button className={cx('button')} onClick={searchTables}>
                    Tìm Kiếm
                </button>
            </div>
            <div className={cx('table-layout')}>
                {tables.map((table, idx) => (
                    <div className={cx(`table`)}>
                        <div key={idx} className={cx(`table ${table.TinhTrangBan}`)}>
                            <h2>{table.TenBan}</h2>
                            <div className={cx(`avt`)}>
                                <img className={cx('img')} src={tbl} alt="aaaaa" />
                            </div>

                            <h5 className={cx(getStatusText(table.TinhTrangBan))}>
                                Trạng Thái:
                                {table.TinhTrangBan === 0
                                    ? 'trống'
                                    : table.TinhTrangBan === 1
                                    ? 'đã đặt trước'
                                    : table.TinhTrangBan === 2
                                    ? 'đang phục vụ'
                                    : ''}
                            </h5>
                            <button
                                className={cx('button')}
                                onClick={() =>
                                    updateStatus(table.id, table.status === 'available' ? 'occupied' : 'available')
                                }
                            >
                                {table.status === 'available' ? 'Đặt' : 'Giải Phóng'}
                            </button>
                            <button className={cx('button')} onClick={() => deleteTable(table)}>
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Thêm Bàn Mới</h2>
            <input
                type="text"
                placeholder="Số Bàn"
                value={newTable.TenBan}
               onChange={(e) => {
                const input = e.target.value;
    const tenBan = input.startsWith("Bàn ") ? input : `Bàn ${input}`;
    setNewTable({ ...newTable, TenBan: tenBan });
}}/>
            <input
                type="number"
                placeholder="Tầng"
                value={newTable.Tang}
                onChange={(e) => setNewTable({ ...newTable, Tang: e.target.value })}
            />
            <button className={cx('button')} onClick={addTable}>
                Thêm Bàn
            </button>
        </div>
    );
}

export default App;
