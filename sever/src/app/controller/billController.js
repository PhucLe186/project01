
const { db } = require('../../firebaseconfig/firebase');
class BillsController {
  async  getBills (req, res) {
    try {
        const snapshot = await db.ref("bills").once("value");
        const data= snapshot.val()
        const bills = Object.keys(data).map((key) =>({
           
            ID_HoaDon:key,
            ...data[key]
        }))
        console.log(bills)
        const ids= bills.map(id=>id.ID_Ban)

        const tablesSnapshot= await Promise.all(
            ids.map(id=> db.ref(`ban/${id}`).once('value'))
        ) 
    const tables = tablesSnapshot.map(snap => snap.val());

    const datas = bills.map((bill, index) => ({
            ...bill,
            table: tables[index] || null,
        }));
console.log(datas)
    
        res.status(200).json(datas);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi lấy danh sách hóa đơn" });
    }
};


async getBillById (req, res)  {
    const { id } = req.params;
    try {
        const snapshot = await db.ref(`bills/${id}`).once("value");
        const bill = snapshot.val();
        const ids= bill.ID_Ban
        
        const data= await db.ref(`ban/${ids}`).once('value')
        const table=data.val()

        const bigdata= {id,table , ...bill}
        console.log(bigdata)
        if (!bill) {
            return res.status(404).json({ error: "Hóa đơn không tồn tại" });
        }

        res.status(200).json( bigdata );
    } catch (error) {
        console.error("❌ Lỗi khi lấy hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi lấy hóa đơn" });
    }
};


async addBill (req, res) {
    try {
        const {orderId} = req.body;

        if (!orderId) {
            return res.status(400).json({ message: "Thiếu dữ liệu hóa đơn hoặc danh sách món ăn không hợp lệ" });
        }

        const data= db.ref('chitietban').child(orderId)
        const snapshot= await data.once('value')
        const list = snapshot.val()
        
        const item= Object.keys(list).map(key=>({
            ...list
        }))


        const HD_ID=item[0]?.Ma_HoaDon
        const billist= db.ref(`bills/${HD_ID}`)
        await billist.set({
            ...item[0],
            note:null,
            trangthai:'chưa thanh toán' }
        )
        data.update({trangthai:2})

        res.status(201).json({ success: true, message: "Thêm hóa đơn thành công", });
    } catch (error) {
        console.error("Lỗi khi thêm hóa đơn:", error);
        res.status(500).json({ success: false, message: "Lỗi server", error: error.toString() });
    }
};



async updateBill(req, res) {
    const { id } = req.params;
    try {
        await db.ref(`bills/${id}`).update(req.body);
        res.status(200).json({ message: "Cập nhật hóa đơn thành công" });
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi cập nhật hóa đơn" });
    }
};


async deleteBill (req, res) {
    const { id } = req.params;
    try {
        await db.ref(`bills/${id}`).remove();
        res.status(200).json({ message: "Xóa hóa đơn thành công" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi xóa hóa đơn" });
    }
};
}
module.exports= new BillsController()
