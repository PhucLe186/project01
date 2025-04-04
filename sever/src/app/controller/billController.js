const { db } = require('../../firebaseconfig/firebase');
class BillsController {
  async  getBills (req, res) {
    try {
        const snapshot = await db.ref("bills").once("value");
        const bills = snapshot.val() || {};
        res.status(200).json(bills);
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

        if (!bill) {
            return res.status(404).json({ error: "Hóa đơn không tồn tại" });
        }

        res.status(200).json({ id, ...bill });
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
        const item= (snapshot.val())
   
        const newBillRef = db.ref("bills").push().key;
        const billist= db.ref(`bills/${newBillRef}`)
        await billist.set({
            ...item,
            note:null,
            trangthai:'chưa thanh toán' }
        )

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
