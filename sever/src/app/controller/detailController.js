const { db } = require('../../firebaseconfig/firebase');//UserID
class DetailController {
    async index(req, res){ 
        const UserID=req.session.user.uid
        if(UserID){
            try{
                const check= await db.ref('chitietban').orderByChild('UserID').equalTo(UserID).once('value')
                if(!check.exists()){
                    res.status(400).json({error:"lỗi thực thi"})
                }
                const detal=db.ref(`chitietban`)
            const snapshot= await detal.once("value")
            const data= snapshot.val()

            ///////////////////////////////////////////
            // const food= db.ref(`chitietban/${key}/MonAn`)
            // const foodref= await food.once("value")
            // const datafood= foodref.val()
            // const namefood=Object.values(datafood).map(item=>item.TenMonAn)
            
            res.json({ success:true  , data: data})


            }catch(error){
            res.status(400).json({error:"lỗi hiển thị"})
        }
        }
    }
    async cancelorder(req, res){
        
       try
       {
        const UserID=req.session.user.uid
       if(!UserID){
        res.status(400).json({ message:'chưa đăng nhập'})
       }
       
        const{ID_chitietban}= req.body
        const data= db.ref(`chitietban/${ID_chitietban}`)
        const snapshot= await data.once('value')
    
        if(!snapshot.exists()){
            res.status(400).json({ message:'lỗi hủy đơn'})
        }
        const item =snapshot.val()
        if (item.trangthai === 3) {
            return res.status(400).json({ message: 'Đơn hàng đã được hủy trước đó' });
        }  
      
        await data.update({ trangthai:4 })
        res.json({success: true})

        const ID_Ban=item.ID_Ban
        console.log(ID_Ban)
        const table= db.ref(`ban/${ID_Ban}`)
        

        await table.update({TinhTrangBan:0})

    }catch(error){
        res.status(500).json({ error: 'lỗi server'})
    }


    }
}
module.exports = new DetailController();