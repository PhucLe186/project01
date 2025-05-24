const bills = [
    {
        id: 1,
        customer: "Nguyễn Văn A",
        table: "Bàn 5",
        total: 120000,
        status: "Đã thanh toán",
        items: [
            { name: "Phở bò", price: 50000, quantity: 2 },
            { name: "Trà đá", price: 10000, quantity: 2 },
        ],
    },
    {
        id: 2,
        customer: "Trần Thị B",
        table: "Bàn 2",
        total: 150000,
        status: "Chưa thanh toán",
        items: [
            { name: "Bún chả", price: 60000, quantity: 2 },
            { name: "Nước ngọt", price: 15000, quantity: 2 },
        ],
    },
];

export default bills;
