const { db } = require('../../firebaseconfig/firebase');

class RevenueController {
    async Synthetic(req, res) {
        const { from, to } = req.query;

        let fromDate = null;
        let toDate = null;

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
    /////////////////////////////////////////////////////////////////////
    async Total(req, res){

        const { from, to } = req.query;
        let fromDate = null;
        let toDate = null;

        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }
        try {
       const snapshot = await db.ref('bills').once('value');
            const data = snapshot.val();
            let total = 0;
            for (const key in data) {
                const bill = data[key];

                if (bill.trangthai === "chưa thanh toán") continue;
                const billDate = new Date(bill.thoigian);
                if (fromDate && toDate) {
                    if (billDate < fromDate || billDate > toDate) continue;
                }
               total+=bill.TongTien||0
            }
        res.status(200).json({success: true, data: total})
    }catch(error){
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
}
    /////////////////////////////////////////////////////////////////
    async customer(req, res){
        const { from, to } = req.query;
        let fromDate = null;
        let toDate = null;

        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }
        try {
        const snapshot = await db.ref('chitietban').once('value');
            const data = snapshot.val();
            let total = 0;
            for (const key in data) {
                const detail = data[key];

                if (detail.trangthai !== 3) continue;
                const detailDate = new Date(detail.ThoiGian);
                if (fromDate && toDate) {
                    if (detailDate < fromDate || detailDate > toDate) continue;
                }
               total+=Number(detail.SoLuong)
            }
        res.status(200).json({success: true, data: total})
    }catch(error){
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    }
    ///////////////////////////////////////////////////////////////////
    async bill(req, res){
        const { from, to } = req.query;
        let fromDate = null;
        let toDate = null;

        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }
        try {
            const snapshot = await db.ref('bills').once('value');
            const data = snapshot.val();
            let total = 0;
            for (const key in data) {
                const bill = data[key];

                if (bill.trangthai=== "chưa thanh toán") continue;
                const billDate = new Date(bill.thoigian);
                if (fromDate && toDate) {
                    if (billDate < fromDate || billDate > toDate) continue;
                }
               total+=1
            }
        res.status(200).json({success: true, data: total})
    }catch(error){
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
}
    ///////////////////////////////////////////////////////////////////////
    async revenue (req, res) {
        const { from, to } = req.query;
        let fromDate = null;
        let toDate = null;

        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }

        try {
            const hdsnapshot = await db.ref('bills').once('value');
            const billdata = hdsnapshot.val();

            const cpsnapshot = await db.ref('chiphi').once('value');
            const expensedata = cpsnapshot.val();

            const result = {};
            for (const key in billdata) {
                const bill = billdata[key];
                if (bill.trangthai === "chưa thanh toán") continue;
                const billDate = new Date(bill.thoigian);
               
                if (fromDate && toDate) {
                    if (billDate < fromDate || billDate > toDate) continue;
                }

                const dateStr = billDate.toISOString().split('T')[0];
                if (!result[dateStr]){
                    result[dateStr]={revenue: 0, expense: 0}
                 }
                result[dateStr].revenue+=bill.TongTien||0
                
            }

             for (const keyy in expensedata) {
                const price = expensedata[keyy];
                const expenseDate = new Date(price.Ngay);
                if (fromDate && toDate) {
                    if (expenseDate < fromDate || expenseDate > toDate) {
                        continue;
                    }
                }
                const diffDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
                if (diffDays <= 30 && price.LoaiChiPhi === 'Nhân công') {
                    continue;
                }
                const dateStr = expenseDate.toISOString().split('T')[0];
                if (!result[dateStr]) {
                    result[dateStr] = { revenue: 0, expense: 0 };
                }
                result[dateStr].expense += price.SoTien || 0;

            }

            const response = Object.keys(result).map((date) => ({
                date,
                revenue: result[date].revenue,
                expense: result[date].expense
            }));
            res.json({ success: true, data: response });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    }
     async food(req, res){
        const { from, to } = req.query;
        let fromDate = null;
        let toDate = null;

        if (from && to) {
            fromDate = new Date(from);
            toDate = new Date(to);
        }
        try {
            const snapshot = await db.ref('chitietban').once('value');
            const data = snapshot.val();
            let result = {};
            let totalAll=0
            for (const key in data) {
                const bill = data[key];
               
                if (bill.trangthai!== 3) continue;
                const billDate = new Date(bill.thoigian);
                if (fromDate && toDate) {
                    if (billDate < fromDate || billDate > toDate) continue;
                }

                const food=bill.MonAn
                
                for(const ids in food){
                    const fooditem= food[ids].TenMonAn
                    result[fooditem]=(result[fooditem]||0)+food[ids].soLuong
                    totalAll+=food[ids].soLuong
                }
            }
            
            const response = Object.keys(result).map((item) => {
      const count = result[item];
      const percentage = ((count / totalAll) * 100).toFixed(2); // giữ 2 chữ số thập phân
      return {
        item,
        quantity: count,
        percentage: `${percentage}%`,
      };
    })
             .sort((a, b) => b.SoLuong - a.SoLuong).slice(0,10);
        res.status(200).json({success: true, data: response})
    }catch(error){
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
}

}

module.exports = new RevenueController();
