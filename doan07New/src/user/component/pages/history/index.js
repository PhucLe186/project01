import { useEffect, useState } from 'react';
import LichSuDatBan from './bookhistory';
import axios from 'axios';

function HistoryBooking() {
    const [put, setPut] = useState([]);
    const [abort, setAbort] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:5000/detail/', { withCredentials: true });
            if (res.data.success) {
                const data = res.data.data;
                const cartItemsArray = Object.keys(data).map((key) => {
                    return {
                        ID_chitietban: key,
                        ...data[key],
                    };
                });
                const activeOrders = cartItemsArray.filter((order) => order.trangthai !== 0 && order.trangthai !== 3);
                const transformedActiveOrders = activeOrders.map((order) => ({
                    ...order,
                    MonAn: Object.values(order.MonAn).map((mon) => mon.TenMonAn),
                }));

                // Lọc đơn đã hủy (trangthai === 0)
                const canceledOrders = cartItemsArray.filter((order) => order.trangthai === 3);
                const transformedCanceledOrders = canceledOrders.map((order) => ({
                    ...order,
                    MonAn: Object.values(order.MonAn).map((mon) => mon.TenMonAn),
                }));
                setPut(transformedActiveOrders);
                setAbort(transformedCanceledOrders);
            }
        };
        fetchdata();
    }, []);
    console.log(put);
    const huyDon = async (item) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/detail/cancel',
                { ID_chitietban: item.ID_chitietban },
                { withCredentials: true },
            );
            console.log(item);
            if (res.data.success) {
                setPut((prev) => prev.filter((order) => order.ID_chitietban !== item.ID_chitietban));
                setAbort((prev) => [...prev, { ...item, trangthai: 3 }]);
                alert('hủy thành công');
            }
        } catch (error) {
            alert(error.res?.data?.message);
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

    return <LichSuDatBan put={put} abort={abort} huyDon={huyDon} getStatus={getStatusClass} />;
}

export default HistoryBooking;
