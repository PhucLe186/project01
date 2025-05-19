const { db } = require('../../firebaseconfig/firebase');
const bcrypt = require('bcrypt');


class AdminController {

  async loginadmin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu' });
      }
      const admin = db.ref('users');
      const snapshot = await admin.orderByChild('email')
        .equalTo(email)
        .once('value');
 
      if (!snapshot.exists()) {
        res.status(400).json({ message: 'Email không tồn tại' });
        return;
      }

      const userData = Object.values(snapshot.val())[0];
      if (!(await bcrypt.compare(password, userData.secretPass))) {
         res.status(400).json({ message: 'Sai mật khẩu' });
        return;
      }

      req.session.admin = { email: userData.email, uid: userData.userId };
      console.log(req.session.admin)
      return res
        .status(200)
        .json({ message: 'Đăng nhập thành công', admin: req.session.admin });
    } catch (error) {
      console.error('Lỗi server:', error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }

  checklogin(req, res) {
    if (req.session.admin) {
      res.json({ login: true, admin: req.session.admin });
    } else {
      res.json({ login: false });
    }
  }

  logout(req, res) {
    try {
      if (!req.session.admin) {
          return res.status(400).json({ message: "Không có người dùng nào đang đăng nhập", success: false });
      }

      delete req.session.admin.email;
      delete req.session.admin.uid;

      res.clearCookie('connect.sid');

 console.log(req.session.admin)
      return res.status(200).json({ message: 'Đăng xuất thành công', success: true, admin: req.session.admin });
  } catch (error) {
      return res.status(500).json({ message: 'Lỗi server' });
  }
}

}

module.exports = new AdminController();
