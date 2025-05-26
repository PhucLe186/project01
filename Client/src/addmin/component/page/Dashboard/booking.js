import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './booking.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);
const COLORS = ['#d4af37', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function Dashboard() {
    const [data, setData] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [total, setTotal] = useState(0);
    const [customer, setCustomer] = useState(0);
    const [food, setFood] = useState([]);
    const [bill, setBill] = useState(0);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        // setRevenue([
        //     { date: '2025-05-20', revenue: 5000000, expense: 3000000, profit: 2000000 },
        //     { date: '2025-05-21', revenue: 6200000, expense: 3500000, profit: 2700000 },
        //     { date: '2025-05-22', revenue: 5800000, expense: 4000000, profit: 1800000 },
        //     { date: '2025-05-23', revenue: 6400000, expense: 3100000, profit: 3300000 },
        //     { date: '2025-05-24', revenue: 7100000, expense: 4500000, profit: 2600000 },
        //     { date: '2025-05-23', revenue: 6400000, expense: 8100000, profit: -1700000 },
        // ]);
        fetchRevenue();
    }, []);
    const fetchRevenue = async () => {
        try {
            const [chartRes, totalRes, revenueRes, customerRes, billRes, foodRes] = await Promise.all([
                axios.get('http://localhost:5000/revenue/', { params: { from, to } }),
                axios.get('http://localhost:5000/revenue/total', { params: { from, to } }),
                axios.get('http://localhost:5000/revenue/revenue', { params: { from, to } }),
                axios.get('http://localhost:5000/revenue/customer', { params: { from, to } }),
                axios.get('http://localhost:5000/revenue/bill', { params: { from, to } }),
                axios.get('http://localhost:5000/revenue/food', { params: { from, to } }),
            ]);

            if (chartRes.data.success) setData(chartRes.data.data);
            if (totalRes.data.success) setTotal(totalRes.data.data);
            if (customerRes.data.success) setCustomer(customerRes.data.data);
            if (billRes.data.success) setBill(billRes.data.data);
            if (foodRes.data.success) setFood(foodRes.data.data);
            if (revenueRes.data.success) {
                const data = revenueRes.data.data;
                const processedData = data.map((data) => ({
                    ...data,
                    profit: data.revenue - data.expense,
                }));
                setRevenue(processedData);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
        }
    };

    console.log(customer);
    return (
        <div className={cx('dashboard-container')}>
            <h2 className={cx('title')}>Doanh thu</h2>

            <div className={cx('parent')}>
                <div className={cx('summary-card')}>
                    <p className={cx('label')}>Tổng doanh thu:</p>
                    <h1 className={cx('value')}>{total.toLocaleString()} VND</h1>
                </div>
                <div className={cx('summary-card')}>
                    <p className={cx('label')}>Tổng Số Khách:</p>
                    <h1 className={cx('value')}>{customer}</h1>
                </div>
                <div className={cx('summary-card')}>
                    <p className={cx('label')}>Tổng Số hóa đơn:</p>
                    <h1 className={cx('value')}>{bill}</h1>
                </div>
                <div className={cx('filter-section')}>
                    <label>
                        Từ ngày:
                        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                    </label>
                    <label>
                        Đến ngày:
                        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                    </label>
                </div>
                <button className={cx('button')} onClick={fetchRevenue}>
                    Lọc
                </button>
            </div>

            <div className={cx('chart-section')}>
                <h2>Biểu đồ cột Doanh thu (Tổng theo ngày)</h2>
                <div style={{ width: '100%', height: 400, marginTop: 16 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            barCategoryGap="10%"
                            barGap={0}
                            margin={{ top: 10, right: 10, left: 20, bottom: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" angle={-30} textAnchor="end" />
                            <YAxis tickFormatter={(v) => v.toLocaleString()} />
                            <Tooltip formatter={(v) => `${v.toLocaleString()} VNĐ`} />
                            <Legend />
                            <Bar dataKey="revenue" fill="#d4af37" name="Doanh thu" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={cx('chart-section')}>
                <h2>Biểu đồ Doanh thu, Chi phí và Lợi nhuận theo ngày</h2>
                <div style={{ width: '100%', height: 400, marginTop: 16 }}>
                    <ResponsiveContainer>
                        <LineChart data={revenue} margin={{ top: 10, right: 10, left: 35, bottom: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" angle={-30} textAnchor="end" />
                            <YAxis tickFormatter={(v) => v.toLocaleString()} />
                            <Tooltip formatter={(v) => `${v.toLocaleString()} VNĐ`} />
                            <Legend />
                            <Line
                                type="natural"
                                dataKey="revenue"
                                stroke="#d4af37"
                                strokeWidth={3}
                                isAnimationActive={true}
                                animationDuration={1000}
                                name="Doanh thu"
                            />
                            <Line
                                type="natural"
                                dataKey="expense"
                                stroke="#8884d8"
                                strokeWidth={3}
                                isAnimationActive={true}
                                animationDuration={1000}
                                name="Chi phí"
                            />
                            <Line
                                type="natural"
                                dataKey="profit"
                                stroke="#00C49F"
                                strokeWidth={3}
                                isAnimationActive={true}
                                animationDuration={1000}
                                name="Lợi nhuận"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={cx('statistic-container')}>
                <div className={cx('statistic-list')}>
                    <div className={cx('text')}>
                        <h3> Món ăn bán chạy</h3>
                    </div>
                    <ul>
                        {food.map((item, index) => (
                            <li key={index}>
                                <span
                                    className={cx('dot')}
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></span>
                                <span className={cx('item-name')}>{item.item}</span>
                                <span className={cx('item-quantity')}>{item.quantity} món</span>
                                <span className={cx('item-percent')}>{item.percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={cx('statistic-chart')}>
                    <PieChart width={800} height={500}>
                        <Pie
                            data={food}
                            dataKey="quantity"
                            nameKey="item"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            labelLine={true}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        >
                            {food.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {/* <Legend />  */}
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
