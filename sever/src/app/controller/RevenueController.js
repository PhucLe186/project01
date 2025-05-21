const { db } = require('../../firebaseconfig/firebase');

class RevenueController {
    async index(req, res) {
        const { from, to } = req.query;

        let fromDate = null;
        let toDate = null;

        // Chuyển đổi từ và đến nếu có
        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }

        try {
            const snapshot = await db.ref('bills').once('value');
            const data = snapshot.val();
            const result = {};

            for (const key in data) {
                const bill = data[key];

                if (bill.trangthai === "chưa thanh toán") continue;

                const billDate = new Date(bill.thoigian);

                // Nếu có from/to thì lọc theo ngày, còn không thì lấy tất cả
                if (fromDate && toDate) {
                    if (billDate < fromDate || billDate > toDate) continue;
                }

                const dateStr = billDate.toISOString().split('T')[0];
                result[dateStr] = (result[dateStr] || 0) + bill.TongTien;
            }

            const response = Object.keys(result).map((date) => ({
                date,
                revenue: result[date],
            }));

            res.json({ success: true, data: response });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    }
}

module.exports = new RevenueController();
