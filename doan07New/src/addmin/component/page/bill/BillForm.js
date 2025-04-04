import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './BillForm.module.scss';

const BillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const existingBill = location.state?.bill;

    const [bill, setBill] = useState({
        customer: '',
        table: '',
        total: 0,
        status: 'Chưa thanh toán',
        items: [],
    });

    const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: '' });

    useEffect(() => {
        if (existingBill) {
            setBill(existingBill);
        }
    }, [existingBill]);

    useEffect(() => {
        const newTotal = bill[0]?.MonAn.reduce((sum, item) => sum + item.Gia * item.SoLuong, 0);
        setBill((prevBill) => ({ ...prevBill, total: newTotal }));
    }, [bill[0]?.MonAn]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBill({ ...bill, [name]: value });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = () => {
        if (!newItem.name || !newItem.price) {
            alert('Vui lòng nhập đầy đủ tên món và giá!');
            return;
        }

        setBill({
            ...bill,
            items: [
                ...bill.items,
                { ...newItem, price: parseFloat(newItem.price), quantity: parseInt(newItem.quantity) },
            ],
        });
        setNewItem({ name: '', quantity: 1, price: '' });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = bill.items.filter((_, i) => i !== index);
        setBill({ ...bill, items: updatedItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await axios.put(`http://localhost:5000/api/bills/${id}`, bill);
                alert('✅ Cập nhật hóa đơn thành công!');
            } else {
                response = await axios.post('http://localhost:5000/api/bills', bill);
                alert('✅ Thêm hóa đơn thành công!');
            }
            console.log('📌 API Response:', response.data);
            navigate('/bills');
        } catch (error) {
            console.error('❌ Lỗi khi xử lý hóa đơn:', error.response?.data || error.message);
            alert('Lỗi khi xử lý hóa đơn: ' + (error.response?.data?.message || 'Không xác định'));
        }
    };

    return (
        <div className={styles.container}>
            <h2>{id ? 'Chỉnh sửa hóa đơn' : 'Tạo hóa đơn mới'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Tên khách hàng:
                    <input type="text" name="customer" value={bill.customer} onChange={handleChange} required />
                </label>

                <label>
                    Số bàn:
                    <input type="number" name="table" value={bill.table} onChange={handleChange} required />
                </label>

                <label>
                    Tổng tiền:
                    <input type="number" name="total" value={bill.total} readOnly />
                </label>

                <label>
                    Trạng thái:
                    <select name="status" value={bill.status} onChange={handleChange}>
                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                    </select>
                </label>

                <h3>Danh sách món ăn</h3>
                <div className={styles.itemInput}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên món"
                        value={newItem.name}
                        onChange={handleItemChange}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Số lượng"
                        min="1"
                        value={newItem.quantity}
                        onChange={handleItemChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Giá"
                        value={newItem.price}
                        onChange={handleItemChange}
                        required
                    />
                    <button type="button" onClick={handleAddItem}>
                        ➕ Thêm
                    </button>
                </div>

                {bill[0]?.MonAn.length > 0 && (
                    <ul className={styles.itemList}>
                        {bill[0]?.MonAn?.map((item, index) => (
                            <li key={index}>
                                {item.TenMonAn} - SL: {item.SoLuong} - Giá: {item.Gia.toLocaleString()} VND
                                <button type="button" onClick={() => handleRemoveItem(index)}>
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className={styles.actions}>
                    <button type="submit">{id ? 'Lưu chỉnh sửa' : 'Tạo hóa đơn'}</button>
                    <button type="button" onClick={() => navigate('/bills')}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BillForm;
