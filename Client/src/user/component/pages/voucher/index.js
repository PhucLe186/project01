import axios from 'axios';
import { useState, useEffect } from 'react';
import VoucherList from './VoucherList';
import VoucherDetail from './VoucherDetail';
import styles from './voucher.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import routesconfig from '~/config/routes';

const cx = classNames.bind(styles);

const Voucher = () => {
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const navigate = useNavigate();

    const [voucher, setVoucher] = useState([]);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/voucher/', { withCredentials: true });
                const cartData = res.data;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        Vouchercode: key,
                        ...cartData[key],
                    };
                });
                setVoucher(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchMenu();
    }, []);
    const handleUseVoucher = async (voucher) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/voucher/selectvoucher',
                { vouchercode: voucher.Vouchercode },
                { withCredentials: true },
            );
            if (response.data.success) {
                alert(`Bạn đã sử dụng voucher ${voucher.Vouchercode}`);
                setSelectedVoucher(null);
                navigate(routesconfig.order);
            }
        } catch (error) {
            console.log(error.response?.data?.message || 'lỗi tè le');
        }
    };
    const handleSelectVoucher = (voucher) => {
        setSelectedVoucher(voucher);
    };

    return (
        <div className={cx('parent')}>
            <div className={cx('app')}>
                <h1 className={cx('h1')}>Trang Voucher</h1>
                <div className={cx('voucher-container')}>
                    <VoucherList vouchers={voucher} onSelectVoucher={handleSelectVoucher} />
                    <VoucherDetail voucher={selectedVoucher} onUseVoucher={handleUseVoucher} />
                </div>
            </div>
        </div>
    );
};

export default Voucher;
