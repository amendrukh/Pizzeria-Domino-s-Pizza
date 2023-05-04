export const pizzaBD = {
    size: [
        { name: "small", price: 40 },
        { name: "mid", price: 55 },
        { name: "big", price: 70 }
    ],
    topping: [
        { name: "moc1", price: 40, productName: "Сир звичайний" },
        { name: "moc2", price: 40, productName: "Сир фета" },
        { name: "moc3", price: 40, productName: "Моцарелла" },
        { name: "telya", price: 65, productName: "Телятина" },
        { name: "vetch1", price: 35, productName: "Помiдори" },
        { name: "vetch2", price: 37, productName: "Гриби" }
    ],
    sauce: [
        { name: "sauceClassic", price: 30, productName: "Кетчуп" },
        { name: "sauceBBQ", price: 30, productName: "BBQ" },
        { name: "sauceRikotta", price: 30, productName: "Рiкотта" }
    ]
}

export const pizzaUser = {
    size: { name: "big", price: 70 },
    sauce: [],
    topping: [],
    price: "",
    userPhone: "",
    userEmail: "",
    userName: "",
    data: ""
}























const test = [
    {
        name: "vetch1",
        price: 35,
        productName: "Помiдори"
    },
    {
        name: "vetch1",
        price: 35,
        productName: "Помiдори"
    },
    {
        name: "vetch1",
        price: 70,
        productName: "Колбаса"
    }
];

const test2 = [
    {
        name: "vetch1",
        price: 35,
        productName: "Помiдори",
        count: 2
    },
    {
        name: "vetch1",
        price: 70,
        productName: "Колбаса",
        count: 1
    }
];