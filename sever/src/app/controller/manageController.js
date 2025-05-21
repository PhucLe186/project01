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
      await bills.update({trangthai:"Đã thanh toán", TongTien: item.TongTien, ThanhTien: item.ThanhTien, phuongthuc: paymentMethod==='cod'? 'Tiền mặt':'paymentMethod'})

      const table_id=item.ID_Ban

      const table= db.ref(`ban/${table_id}`)
      await table.update({TinhTrangBan:0})
        
        
        res.json({success:true})
    }

}
module.exports= new ManageController()