const { db } = require('../../firebaseconfig/firebase');
class BookController {
  async table(req, res) {
      const table=db.ref("ban");
      const snapshot= await table.once("value");
      if(!snapshot.exists()){
        res.status(400)
          .json({ message: 'k có dữ liệu bàn' });
      }
      res.json(snapshot.val());
};

async book(req, res){
    try{
    const UserID=req.session.user.uid;
    const {TenKhachHang, ID_Ban, SoDienThoai, SoLuong, ThoiGian,note, ThanhTien, TongTien }=req.body
    if(!UserID){
     return res.status(400).json({ message: 'bạn chưa đăng nhập' });
    } 
    if (!TenKhachHang || !ID_Ban || !SoDienThoai || !SoLuong || !ThoiGian) {
      return res.status(400).json({ message: "Thiếu dữ liệu đặt bàn" });
    }
    
    // const datatable= (await db.ref('ban').child(ID_Ban).once("value")).val();
    // const TenBan=datatable.TenBan
    // const Tang=datatable.Tang
    
///////////////////////////////////////////////////////////////////////////////////////////
    const Cart= db.ref(`GioHang/${UserID}`);
    const snapshot= await Cart.once("value")
 
    if(!snapshot.exists()){
      return res.status(400).json({ message: 'giỏ hàng trống' });
    }
    const Datacart= (snapshot.val());

    
    let tongtien=0
    for(const id in Datacart){
      const mon=Datacart[id]
      tongtien+=mon.ThanhTien*mon.soLuong
      
    }  
      const number = Math.floor(10000000 + Math.random() * 90000000); 
      const Ma_HoaDon=`HD${number}`
      const ID_ChiTietBan= db.ref(`chitietban`).push().key; 
      const datban=db.ref(`chitietban/${ID_ChiTietBan}`);
       
      await datban.set({
        Ma_HoaDon,
        UserID,
        ID_Ban, 
        TenKhachHang,
        SoDienThoai, 
        SoLuong, 
        ThoiGian,
        note, 
        MonAn: Datacart,
        trangthai: 1,
        ThanhTien,
        TongTien,
       
      })
     
      await db.ref(`ban/${ID_Ban}`).update({TinhTrangBan:1})
      await Cart.remove();
      return res.status(200).json({success: true, message: "đặt bàn thành công"})
    }
    catch(error){
     
      res.status(500).json({ error: "lỗi đầy mình"})
    }
}
async BookNow(req, res){
    try{
    const {name, selectBan,number, totalPrice, danhSachMon }=req.body
    
      const random = Math.floor(10000000 + Math.random() * 90000000); 
      const Ma_HoaDon=`HD${random}`

      
      const now = new Date().toISOString();
      const ID_ChiTietBan= db.ref(`chitietban`).push().key; 
      const datban=db.ref(`chitietban/${ID_ChiTietBan}`);
     
    
      const MonAn={}
      danhSachMon.forEach(item => {
        MonAn[item.ID_MonAn]={
          HinhAnhMon:item.HinhAnhMon,
          TenMonAn:item.TenMonAn,
          soLuong:item.SoLuong,
          ThanhTien:item.ThanhTien
        }
      });
      
      await datban.set({
        Ma_HoaDon,
        ID_Ban: selectBan, 
        TenKhachHang: name,
        SoDienThoai: null, 
        SoLuong: number, 
        ThoiGian: now,
        note:'', 
        MonAn,
        trangthai: 2,
        ThanhTien: totalPrice,
        TongTien: totalPrice,
       
      })
       const billist= db.ref(`bills/${Ma_HoaDon}`)
       await billist.set({
            ID_ChiTietBan,
            note:null,
            thoigian:now,
            phuongthuc:'',
            TongTien:0,
            ThanhTien:0,
            trangthai:'chưa thanh toán' }
        )
     
      await db.ref(`ban/${selectBan}`).update({TinhTrangBan:2})
      return res.status(200).json({success: true, message: "đặt bàn thành công"})
    }
    catch(error){
     
      res.status(500).json({ error: "lỗi đầy mình"})
    }
}



}


module.exports = new BookController();
