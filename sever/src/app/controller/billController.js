const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const { db } = require('../../firebaseconfig/firebase');
class BillsController {
  async  getBills (req, res) {
    try {
        const snapshot = await db.ref("bills").once("value");
        const data= snapshot.val()
        const bills = Object.keys(data).map((key) =>({
           
            ID_HoaDon:key,
            ...data[key]
        }))
        
        const ids= bills.map(id=>id.ID_ChiTietBan)
        const Snapshot= await Promise.all(
            ids.map(id=> db.ref(`chitietban/${id}`).once('value'))
        ) 
        const datas = Snapshot.map(snap => snap.val());

      const list = bills.map((bill, index) => ({
                ...bill,
                chitiet:datas[index]

}));

        const table_id=list.map(id=>id.chitiet.ID_Ban)
        console.log(table_id)
        const tabledata =await Promise.all(
            table_id.map(id=> db.ref(`ban/${id}`).once('value'))
        )
        const table=tabledata.map(snap=>snap.val())
        const finaldata=list.map((data,idx)=>({
            ...data,
            ban:table[idx],
        }))
        console.log(finaldata)
        res.status(200).json(finaldata);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi lấy danh sách hóa đơn" });
    }
};


async getBillById(req, res) {
    const { id } = req.params;

    try {
        // Lấy hóa đơn theo ID
        const snapshot = await db.ref(`bills/${id}`).once("value");
        const bill = snapshot.val();

        if (!bill) {
            return res.status(404).json({ error: "Không tìm thấy hóa đơn" });
        }

        const ID_ChiTietBan = bill.ID_ChiTietBan;

        // Lấy chi tiết bàn theo ID_ChiTietBan
        const chiTietSnapshot = await db.ref(`chitietban/${ID_ChiTietBan}`).once("value");
        const chiTiet = chiTietSnapshot.val();

        // Lấy thông tin bàn nếu cần (gợi ý thêm)
        const banSnapshot = await db.ref(`ban/${chiTiet?.ID_Ban}`).once("value");
        const ban = banSnapshot.val();

        // Gộp lại dữ liệu trả về
        const data = {
            ID_HoaDon: id,
            ...bill,
            chitietban: chiTiet || null,
            ban: ban || null
        };

        res.status(200).json(data);
    } catch (error) {
        console.error("❌ Lỗi khi lấy hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi lấy hóa đơn" });
    }
}


async addBill (req, res) {
    try {
        const {orderId} = req.body;

        if (!orderId) {
            return res.status(400).json({ message: "Thiếu dữ liệu hóa đơn hoặc danh sách món ăn không hợp lệ" });
        }
        const data= db.ref('chitietban').child(orderId)
        const snapshot= await data.once('value')
        const item =snapshot.val()

        const table_id=item.ID_Ban
        const table= db.ref(`ban/${table_id}`)
        const number = Math.floor(10000000 + Math.random() * 90000000); // đảm bảo đủ 8 chữ số
        const Ma_HoaDon=`HD${number}`
       const now = new Date().toISOString();

        const billist= db.ref(`bills/${Ma_HoaDon}`)
        await billist.set({
            ID_ChiTietBan:orderId,
            note:null,
            thoigian:now,
            phuongthuc:'',
            TongTien:0,
            ThanhTien:0,
            trangthai:'chưa thanh toán' }
        )
        await data.update({trangthai:2})
        await table.update({TinhTrangBan:2})
        

        res.status(201).json({ success: true, message: "Thêm hóa đơn thành công", });
    } catch (error) {
        console.error("Lỗi khi thêm hóa đơn:", error);
        res.status(500).json({ success: false, message: "Lỗi server", error: error.toString() });
    }
};



async updateBill(req, res) {
    const { id } = req.params;
    try {
        await db.ref(`bills/${id}`).update(req.body);
        res.status(200).json({ message: "Cập nhật hóa đơn thành công" });
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi cập nhật hóa đơn" });
    }
};


async deleteBill (req, res) {
    const { id } = req.params;
    try {
        await db.ref(`bills/${id}`).remove();
        res.status(200).json({ message: "Xóa hóa đơn thành công" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa hóa đơn:", error);
        res.status(500).json({ error: "Lỗi khi xóa hóa đơn" });
    }
};

async exportBillToPDF (req, res) {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`bills/${id}`).once("value");
    const bill = snapshot.val();

    const chiTiet = (await db.ref(`chitietban/${bill.ID_ChiTietBan}`).once("value")).val();
     const data = Object.keys(chiTiet).map((key) => ({
                    ...chiTiet,
                }));
    const ban = (await db.ref(`ban/${chiTiet?.ID_Ban}`).once("value")).val();
   
     const transform = data.map((order) => ({
                    ...order,

                    MonAn: Object.values(order.MonAn).map((mon) => ({
                        TenMonAn: mon.TenMonAn,
                        Gia: mon.ThanhTien,
                        SoLuong: mon.soLuong,
                    })),
                }));
                
    const html = `
      <html>
<head>
    <style>
        body { font-family: Arial; padding: 20px; max-width: 700px; margin: auto; background: #fffdfa; color: #333; }
        h1 { text-align: center; color: #d4af37; }
        .section { margin-bottom: 20px; }
        .bold { font-weight: bold; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table, th, td {
            border: 1px solid #d4af37;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f9f5ec;
        }
        .footer {
            margin-top: 30px;
            font-style: italic;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <h1>HÓA ĐƠN THANH TOÁN</h1>

    <div class="section" style="text-align:center;">
        <h2>Nhà hàng Xiangyuan</h2>
        <p>Địa chỉ:  245 Nguyễn Thái Bình, Tân Bình, TP.HCM</p>
        <p>Điện thoại: 0969119817 </p>
        <p>email: Xiangyuan@nhahang.com </p>
    </div>

    <div class="section">
        <p><span class="bold">Mã hóa đơn:</span> ${id}</p>
        <p><span class="bold">Ngày lập:</span> ${bill.thoigian || "N/A"}</p>
        <p><span class="bold"></span> ${ban?.TenBan || "N/A"}</p>
        <p><span class="bold">Khách hàng:</span> ${chiTiet.TenKhachHang || "Khách lẻ"}</p>
        <p><span class="bold">SĐT khách:</span> ${chiTiet.SoDienThoai
 || "N/A"}</p>
    </div>

    <div class="section">
        <p class="bold">Chi tiết món ăn:</p>
        <table>
            <thead>
                <tr>
                    <th>Tên món</th>
                    <th>Số lượng</th>
                    <th>Đơn giá (VNĐ)</th>
                    <th>Thành tiền (VNĐ)</th>
                </tr>
            </thead>
            <tbody>
                ${
                  transform[0].MonAn?.map(mon => `
                    <tr>
                        <td>${mon.TenMonAn}</td>
                        <td>${mon.SoLuong}</td>
                        <td>${Number(mon.Gia).toLocaleString()}</td>
                        <td>${(mon.SoLuong * mon.Gia).toLocaleString()}</td>
                    </tr>
                  `)
                }
            </tbody>
        </table>
    </div>

    <div class="section">
    <p><span class="bold">Thành tiền:</span> ${ (bill.ThanhTien ).toLocaleString()} VNĐ</p>
    <p><span class="bold">Giảm giá:</span> ${((bill.TongTien) -(bill.ThanhTien)).toLocaleString()} VNĐ</p>
    <p><span class="bold">Tổng tiền:</span> ${(bill.TongTien ?? 0).toLocaleString()} VNĐ</p>
    </div>


    <div class="footer">
        <p>Cảm ơn quý khách! Hẹn gặp lại.</p>
    </div>
</body>
</html>

    `;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="hoadon_${id}.pdf"`,
      "Content-Length": pdfBuffer.length,
      "Content-Transfer-Encoding": "binary"
    });

    res.end(pdfBuffer);
  } catch (err) {
    console.error("❌ Lỗi xuất PDF:", err);
    res.status(500).json({ error: "Lỗi khi xuất hóa đơn PDF" });
  }
}
}
module.exports= new BillsController()
