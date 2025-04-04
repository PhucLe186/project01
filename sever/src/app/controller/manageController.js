const { db } = require('../../firebaseconfig/firebase');
class ManageController {
    async index(req, res){
        const data= await db.ref('chitietban').once('value')
        if(!data.exists()){
            res.status(400).json({message:' không có dữ liệu bàn'})
        }
        res.json(data.val())
    }

}
module.exports= new ManageController()