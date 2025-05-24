const { db } = require('../../firebaseconfig/firebase');



class ExpenseController {
  async index(req, res) {
    const {day, expenseType, amount, note }=req.body;
    const kyTu = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ma = '';
    for (let i = 0; i < 5; i++) {
    ma += kyTu.charAt(Math.floor(Math.random() * kyTu.length));
    }
    console.log(ma)
    const detail= db.ref(`chiphi/${ma}`)
    await detail.set({
        Ngay: day,
        LoaiChiPhi: expenseType,
        SoTien: amount,
        GhiChu:note,
    })
   
    res.json({success:true})
   
}
async data(req, res) {
    
    const detail= (await db.ref(`chiphi`).once('value'))
    const snapshot=detail.val()
    res.json({success:true, data:snapshot})
   
}



}


module.exports = new ExpenseController();
