const { db } = require('../../firebaseconfig/firebase');
class ManageController {
    async index(req, res){
        const data= (await db.ref('chitietban').once('value')).val()
         
        const bills = Object.keys(data).map((key) =>({
           
            ID_ChiTietBan:key,
            ...data[key]
        }))
        
        const ids= bills.map(id=>id.ID_Ban)

        const tablesSnapshot= await Promise.all(
            ids.map(id=> db.ref(`ban/${id}`).once('value'))
        ) 
        const tables = tablesSnapshot.map(snap => snap.val());

        const datas = bills.map((bill, index) => ({
            ...bill,
            table: tables[index] || null,
        }));
        
       
        res.json({success:true, datas})
    }

    async checkout(req, res){
        const{ID_ChiTietBan, paymentMethod}=req.body
        const data= db.ref(`chitietban/${ID_ChiTietBan}`)
        const snapshot=await data.once("value")
        const item= snapshot.val()
        await data.update({trangthai:3})
        
        const now = new Date().toISOString();

        const bill= db.ref(`bills/`)
        const snap=await bill.once("value")
        const hoadon=snap.val()
        let ID_HoaDon = null;
        for (const id in hoadon) {
            if (hoadon[id].ID_ChiTietBan === ID_ChiTietBan) {
                ID_HoaDon = id;
                break;
            }
        }
        
      const bills= db.ref(`bills/${ID_HoaDon}`)
      await bills.update({trangthai:"Đã thanh toán", TongTien: item.TongTien, thoigian:now, ThanhTien: item.ThanhTien, phuongthuc: paymentMethod==='cod'? 'Tiền mặt':'paymentMethod'})

      const table_id=item.ID_Ban

      const table= db.ref(`ban/${table_id}`)
      await table.update({TinhTrangBan:0})
        
        
        res.json({success:true})
    }

async book(req, res){
    try{

    const {TenKhachHang, ID_Ban, SoDienThoai, SoLuong, ThoiGian,note, ThanhTien, TongTien, selectedFoods }=req.body
    

      const MonAn={}
      selectedFoods.forEach(item =>{
          MonAn[item.ID_MonAn]={
          HinhAnhMon:item.HinhAnhMon,
          TenMonAn:item.TenMonAn,
          soLuong:item.SoLuong,
          ThanhTien:item.ThanhTien
        }
      });
      
   
      const number = Math.floor(10000000 + Math.random() * 90000000); 
      const Ma_HoaDon=`HD${number}`
      const ID_ChiTietBan= db.ref(`chitietban`).push().key; 
      const datban=db.ref(`chitietban/${ID_ChiTietBan}`);
       
      await datban.set({
        Ma_HoaDon,
        ID_Ban, 
        TenKhachHang,
        SoDienThoai, 
        SoLuong, 
        ThoiGian,
        note, 
        MonAn,
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

}
module.exports= new ManageController()