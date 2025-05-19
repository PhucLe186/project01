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
        const{ID_ChiTietBan}=req.body
        const data= db.ref(`chitietban/${ID_ChiTietBan}`)
        const snapshot=await data.once("value")
        const item= snapshot.val()
        await data.update({trangthai:3})
        

        const hoadon= item.Ma_HoaDon
        const bill= db.ref(`bills/${hoadon}`)
        const snap=await bill.once("value")
        await bill.update({trangthai: "Đã thanh toán" })
        
        
        res.json({success:true})
    }

}
module.exports= new ManageController()