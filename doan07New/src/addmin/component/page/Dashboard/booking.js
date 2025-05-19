import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classNames from 'classnames/bind';
import styles from './booking.module.scss'

const cx= classNames.bind(styles)

function Dashboard() {
    const data = [
        { date: '24 Apr', revenue: 1000000, profit: 500000 },
        { date: "May '23", revenue: 900000, profit: 450000 },
        { date: '08 May', revenue: 2000000, profit: 1000000 },
        { date: '16 May', revenue: 4000000, profit: 2000000 },
    ];
    return (
        <div className={cx("chart-container")}>
            <ResponsiveContainer width="95%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#007bff" name="Doanh thu" />
                    <Line type="monotone" dataKey="profit" stroke="#28a745" name="Lợi nhuận" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Dashboard;
