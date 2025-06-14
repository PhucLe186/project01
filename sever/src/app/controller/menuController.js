const { db } = require('../../firebaseconfig/firebase');
class MenuController {
  async index(req, res) {
      const menu=db.ref("monan");
      const snapshot= await menu.once("value");
      const data=(snapshot.val())

      const id = Object.keys(data).map(key => ({
        ID_MonAn: key,
        ...data[key]
      }));
console.log(id)


      const ids = Object.values(id).map(item => item.ID_ChiTietMon);

      
      const list_id= await Promise.all(
        ids.map(id=> db.ref(`ChiTietMonAn/${id}`).once('value'))
    )
    const detail=list_id.map(snap=>snap.val())
    const bigdata=Object.values(id).map((item,idx)=>({
        
        ...item,
        chitietmon:detail[idx]
    }))
   
      
      if(bigdata){
        res.json({bigdata});
      }else{
        res.status(404).json({message: "không có dữ liệu món ăn"})
      }   
  }

  async add(req, res) {
    try {
        const UserId = req.session.user.uid;
        if (!UserId) {
            return res.status(401).json({ error: "Bạn chưa đăng nhập!" });
        }

        const { ID_MonAn, TenMonAn, ThanhTien, HinhAnhMon } = req.body;
        if (!ID_MonAn || !TenMonAn || !ThanhTien || !HinhAnhMon) {
            return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
        }

       
        const food = db.ref(`monan/${ID_MonAn}`);

        // Lấy dữ liệu món ăn
        const value = await food.once("value");
        const item = value.val();

        if (!item) {
            return res.status(404).json({ error: "Món ăn không tồn tại" });
        }

        if (item.SoLuong <= 0) {
            return res.status(400).json({ error: "Món ăn đã hết hàng" });
        }

        // Cập nhật số lượng món ăn
        const newQuantity = item.SoLuong - 1;
        const newStatus = newQuantity === 0 ? "hết" : "còn";

        await food.update({
            SoLuong: newQuantity,
            TrangThai: newStatus,
        });

        // Kiểm tra xem món đã có trong giỏ hàng chưa
        const menu = db.ref(`GioHang/${UserId}/${ID_MonAn}`);
        const snapshot = await menu.once("value");
        if (snapshot.exists()) {
            const Data = snapshot.val();
            await menu.update({ soLuong: Data.soLuong + 1 });
        } else {
            await menu.set({ TenMonAn, ThanhTien, soLuong: 1, HinhAnhMon });
        }

        res.json({
            success: true,
            message: "Thêm món thành công",
            SoLuong: newQuantity,
            TrangThai: newStatus,
        });

    } catch (error) {
        res.status(500).json({ error: "Lỗi khi thêm món!", details: error.message });
    }
}



}


module.exports = new MenuController();
