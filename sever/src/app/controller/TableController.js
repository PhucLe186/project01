const { db } = require('../../firebaseconfig/firebase');
class TableController {
async table(req, res) {
    try {
        const snapshot = await db.ref('ban').once('value');
        const tables = snapshot.val() || {};
        res.json(tables);
    } catch (error) {
        res.status(500).send(error);
    }
  };
  // Thêm một bàn mới
async addtable (req, res){
    try {
        const newTable = req.body;
        const ref = db.ref('ban').push();
        await ref.set(newTable);
        res.json({ id: ref.key, ...newTable });
    } catch (error) {
        res.status(500).send(error);
    }
  };

  // Chỉnh sửa thông tin bàn
async detail (req, res){
    try {
        const { id } = req.params;
        const updatedTable = req.body;
        await db.ref(`tables/${id}`).update(updatedTable);
        res.json({ id, ...updatedTable });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  // Xóa bàn
async delete (req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        
        
        const table= db.ref(`ban/${id}`);
        const snapshot= await table.once('value')
        if(snapshot.exists()){
            await table.remove()
            res.json( {success : true});
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
  }
// Cập nhật trạng thái bàn
async updatestatus (req, res){
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.ref(`tables/${id}`).update({ status });
        res.json({ id, status });
    } catch (error) {
        res.status(500).send(error);
    }
  };
async search (req, res) {
    try {
        const { number, TinhTrangBan } = req.query;
        const snapshot = await db.ref('ban').once('value');
        let tables = snapshot.val() || {};
        
        tables = Object.entries(tables).map(([id, data]) => ({ id, ...data }));
  
        if (number) {
            tables = tables.filter(table => table.Tang == number);
        }
        if (TinhTrangBan) {
            tables = tables.filter(table => table.TinhTrangBan == TinhTrangBan);
        }
  
        res.json(tables);
    } catch (error) {
        res.status(500).send(error);
    }
  };
}
module.exports = new TableController();
