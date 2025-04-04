import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './menulist.module.scss';

const cx = classNames.bind(styles);

function Pagination({ newsList, onClick }) {
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 20;

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(newsList.length / newsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleadd = (news) => {
        if (onClick) {
            onClick(news);
        }
    };
    return (
        <div className={cx('parent')}>
            <div className={cx('inner')}>
                <ul className={cx('list')}>
                    {currentNews.map((news, index) => (
                        <li className={cx('item')} key={index}>
                            <img src={news.HinhMonAn} alt={news.courseName} className={cx('img')} />

                            <div className={cx('container')}>
                                <div className={cx('name')}>{news.TenMonAn}</div>
                                <div className={cx('price')}>{news.ThanhTien.toLocaleString()} VND</div>
                            </div>

                            <div className={cx('status')}>
                                <button className={cx('show')}> chi tiết</button>
                                <button
                                    className={cx('show')}
                                    disabled={news.TrangThai === 'hết'}
                                    onClick={() => handleadd(news)}
                                >
                                    {news.TrangThai === 'hết' ? 'hết' : <FontAwesomeIcon icon={faCartShopping} />}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Nút phân trang */}
            {totalPages === 1 ? (
                <></>
            ) : (
                <div className={cx('btn')}>
                    <button
                        className={cx('btn-left')}
                        onClick={() =>
                            currentPage === 1 ? setCurrentPage(totalPages) : setCurrentPage(currentPage - 1)
                        }
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    {pageNumbers.map((number) => (
                        <button className={cx('number')} key={number} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    ))}

                    <button
                        className={cx('btn-right')}
                        onClick={() =>
                            currentPage === totalPages ? setCurrentPage(1) : setCurrentPage(currentPage + 1)
                        }
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pagination;
