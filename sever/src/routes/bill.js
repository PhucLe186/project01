const express = require("express");
const BillController = require("../app/controller/billController");

const router = express.Router();


router.get("/:id",BillController.getBillById);
router.put("/:id",BillController.updateBill);
router.delete("/:id", BillController.deleteBill);
router.post('/addbill',BillController.addBill)
router.get("/", BillController.getBills);


module.exports = router;