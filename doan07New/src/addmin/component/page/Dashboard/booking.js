import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classNames from 'classnames/bind';
import styles from './booking.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);
const COLORS = ['#d4af37', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function Dashboard() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/revenue/');
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (err) {
            console.error('Lỗi lấy dữ liệu:', err);
        }
    };

    useEffect(() => {
        fetchData(); // Gọi khi component vừa load
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Biểu đồ tròn Doanh thu (Tổng tất cả các ngày)</h2>

            <div style={{ width: '100%', height: 400, marginTop: 20 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="revenue"
                            nameKey="date"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#d4af37"
                            label={(entry) => `${entry.date}: ${entry.revenue.toLocaleString()} VNĐ`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(v) => `${v.toLocaleString()} VNĐ`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Dashboard;
