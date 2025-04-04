import { useState } from 'react';
import Pagination from './Pagination';
import classNames from 'classnames/bind';
import styles from './menulist.module.scss';
const cx = classNames.bind(styles);

function Menuitem({ menuitem, onClick }) {
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');

    const data = menuitem
        .filter((item) => category === 'all' || category === item.LoaiMonAn)
        .filter((item) => item.TenMonAn.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('child1')}>
                <input className={cx('search')} value={search} onChange={(e) => setSearch(e.target.value)} />

                <button className={cx('filter1')} onClick={() => setCategory('all')}>
                    tất cả
                </button>
                <button className={cx('filter2')} onClick={() => setCategory('Món chính')}>
                    món chính
                </button>
                <button className={cx('filter3')} onClick={() => setCategory('Tráng miệng')}>
                    tráng miệng
                </button>
            </div>
            <div className={cx('child2')}>
                {data.length > 0 ? (
                    <Pagination newsList={data} onClick={onClick} />
                ) : (
                    <div className={cx('text')}> không tìm thấy món ăn</div>
                )}
            </div>
        </div>
    );
}

export default Menuitem;
