const { db } = require('../../firebaseconfig/firebase');
class customerController {
    async index(req, res){
        console.log('tới đây rồi')
        try {
            const member= db.ref('khachhang')
            const snapshot = await member.once('value');
            const data = snapshot.val();
            console.log('tới đây rồi')
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy danh sách khách hàng' });
        }
    }


    async edit (req, res){
        try {
            const newCustomer = req.body;
            const newRef = customersRef.push();
            await newRef.set(newCustomer);
            res.json({ id: newRef.key, ...newCustomer });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi thêm khách hàng' });
        }
    }
    

    async putt (req, res){
        try {
            const { id } = req.params;
            const updatedData = req.body;
            await customersRef.child(id).update(updatedData);
            res.json({ id, ...updatedData });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật khách hàng' });
        }
    }
    

    async delete(req, res){
        try {
            const { id } = req.params;
            await customersRef.child(id).remove();
            res.json({ success: true, id });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa khách hàng' });
        }
    }
    
}
module.exports= new customerController()