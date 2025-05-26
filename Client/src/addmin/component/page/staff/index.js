import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './staff.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Expense() {
    const today = new Date().toISOString();
    const [day, setDay] = useState(today);
    const [expenseType, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');
    const [expenseList, setExpenseList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const ngay = new Date(day).toISOString().slice(0, 10);
    const expense = {
        day,
        expenseType,
        amount: parseInt(amount),
        note,
    };

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:5000/expense/data', { withCredentials: true });
            const list = res.data.data;
            const train = Object.keys(list).map((key) => ({
                ID_chitieu: key,
                ...list[key],
            }));
            setExpenseList(train);
        };
        fetchdata();
    }, []);
    console.log(expenseList);

    const handleSubmit = async () => {
        if (!day || !expenseType || !amount) {
            setStatus('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        const response = await axios.post('http://localhost:5000/expense/', expense, { withCredentials: true });
        if (response.data.success) {
            setStatus(`Đã nhập chi phí: ${expenseType} - ${amount.toLocaleString()} VND ngày ${day}`);
        }

        setDay('');
        setExpenseType('');
        setAmount('');
        setNote('');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Danh sách chi tiêu</h2>
                <button
                    className={cx('toggleButton')}
                    onClick={() => setShowForm(!showForm)}
                    aria-label={showForm ? 'Ẩn form nhập chi phí' : 'Hiện form nhập chi phí'}
                    type="button"
                >
                    {showForm ? '−' : '+'}
                </button>
            </div>

            {expenseList.length > 0 ? (
                <div className={cx('listWrapper')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Loại</th>
                                <th>Số tiền</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseList.map((item, index) => (
                                <tr key={index}>
                                    <td>{new Date(item.Ngay).toISOString().slice(0, 10)}</td>
                                    <td>{item.LoaiChiPhi}</td>
                                    <td>{item.SoTien.toLocaleString()} VND</td>
                                    <td>{item.GhiChu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={cx('noData')}>Chưa có chi phí nào được nhập.</p>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <div className={cx('formRow')}>
                        <label className={cx('label')} htmlFor="ngay">
                            Ngày
                        </label>
                        <input id="ngay" type="date" className={cx('input')} value={ngay} readOnly />
                    </div>

                    <div className={cx('formRow')}>
                        <label className={cx('label')} htmlFor="loaiChiPhi">
                            Loại chi phí
                        </label>
                        <select
                            id="loaiChiPhi"
                            className={cx('input')}
                            value={expenseType}
                            onChange={(e) => setExpenseType(e.target.value)}
                        >
                            <option value="">--Chọn loại--</option>
                            <option value="Nguyên liệu">Nguyên liệu</option>
                            <option value="Nhân công">Nhân công</option>
                            <option value="Vận hành">Vận hành</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div className={cx('formRow')}>
                        <label className={cx('label')} htmlFor="soTien">
                            Số tiền (VND)
                        </label>
                        <input
                            id="soTien"
                            type="text"
                            inputMode="numeric"
                            className={cx('input')}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className={cx('formRow')}>
                        <label className={cx('label')} htmlFor="ghiChu">
                            Ghi chú
                        </label>
                        <textarea
                            id="ghiChu"
                            className={cx('textarea')}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    <div className={cx('formFooter')}>
                        <button type="submit" className={cx('button')}>
                            Thêm
                        </button>
                    </div>
                </form>
            )}

            {status && <p className={cx('status')}>{status}</p>}
        </div>
    );
}

export default Expense;
