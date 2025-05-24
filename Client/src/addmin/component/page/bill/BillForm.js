import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './BillForm.module.scss';


const BillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const existingBill = location.state?.bill;

    console.log(existingBill)
    const [bill, setBill] = useState({
  trangthai: 'Chưa thanh toán',
  MonAn: [],
  TenKhachHang: '',
  TenBan: '',
  ThanhTien: 0,
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
    }, [bill.MonAn]);

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
                    <input type="text" name="customer" value={bill.TenKhachHang} readOnly />
                </label>

                <label>
                    Số bàn:
                    <input type="text" name="table" value={bill.TenBan} readOnly />
                </label>

                <label>
                    Tổng tiền:
                    <input type="number" name="total" value={bill.ThanhTien} readOnly />
                </label>

                <label>
                    Trạng thái:
                    <select name="status" value={bill[0]?.trangthai} onChange={handleChange}>
                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                    </select>
                </label>

              <h3 className={styles.subTitle}>Danh sách món ăn</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Món</th>
                        <th>Đơn giá (VND)</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.MonAn?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.TenMonAn}</td>
                            <td>{Number(item.Gia).toLocaleString()}</td>
                            <td>{item.SoLuong}</td>
                            <td>{Number(item.Gia * item.SoLuong).toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className={styles.total}>Tổng tiền: {Number(bill.TongTien).toLocaleString()} VND</h3>


                

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
