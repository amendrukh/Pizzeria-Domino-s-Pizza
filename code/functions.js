import {pizzaUser, pizzaBD} from "./data-pizza.js";

const table = document.querySelector(".table");
let target = document.getElementById("target");

const pizzaSelectSize = (e) => {
    if (e.target.tagName === "INPUT" && e.target.checked) {
        pizzaUser.size = pizzaBD.size.find(el => el.name === e.target.id);
    }
    show(pizzaUser)
};

const pizzaSelectTopping = (element) => {
    console.log(element)
    switch (element.id) {
        case "sauceClassic" :
        case "sauceBBQ" :
        case "sauceRikotta" :
            pizzaUser.sauce.push(pizzaBD.sauce.find(el => el.name === element.id));
            break;
        case "moc1" :
        case "moc2" :
        case "moc3" :
        case "telya" :
        case "vetch1" :
        case "vetch2" :
            pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === element.id));
            break;
    }

    show(pizzaUser);
    if (element.tagName === "IMG") {
        table.insertAdjacentHTML("beforeend", `<img data-id="${element.id}" class="pizza_image" src="${element.src}" alt="topping">`)
    }
}


function show(pizza) {
    const price = document.getElementById("price");
    const sauce = document.getElementById("sauce");
    const topping = document.getElementById("topping")

    let totalPrice = 0;
    if (pizza.size !== "") {
        totalPrice += parseFloat(pizza.size.price);
    }
    if (pizza.sauce !== "") {
        totalPrice += pizza.sauce.reduce((a, b) => a + b.price, 0);
        // totalPrice += parseFloat(pizza.sauce.price);
    }
    if (pizza.topping !== "") {
        totalPrice += pizza.topping.reduce((a, b) => a + b.price, 0);
    }
    price.innerText = totalPrice;

    if (Array.isArray(pizza.topping)) {
        const toppingWithCount = [];
        for (const topping of pizza.topping) {
            if (toppingWithCount.find(el => el.name === topping.name)) {
                const index = toppingWithCount.findIndex(el => el.name === topping.name);
                toppingWithCount[index].count += 1;
            } else {
                toppingWithCount.push({...topping, count: 1});
            }
        }
        topping.innerHTML = toppingWithCount.map(el => `<span class="topping">${el.productName} <span class="count">${el.count}</span><span data-id="${el.name}" class="del">-</span></span>`).join("");
    }
    if (Array.isArray(pizza.sauce)) {
        const sauceWithCount = [];
        for (const sauce of pizza.sauce) {
            if (sauceWithCount.find(el => el.name === sauce.name)) {
                const index = sauceWithCount.findIndex(el => el.name === sauce.name);
                sauceWithCount[index].count += 1;
            } else {
                sauceWithCount.push({...sauce, count: 1});
            }
        }

        sauce.innerHTML = sauceWithCount.map(el => `<span class="topping">${el.productName} <span class="count">${el.count}</span><span data-id="${el.name}" class="del">-</span></span>`).join("");
    }

    pizzaUser.price = totalPrice;
    pizzaUser.data = new Date()
}

const pizzaDeleteTopping = (e) => {
    const el = e.target;

    if (el.innerText === "-" && el.classList.contains("del")) {
        switch (el.dataset.id) {
            case "sauceClassic" :
            case "sauceBBQ" :
            case "sauceRikotta" :
                pizzaUser.sauce = removeElement(pizzaUser.sauce, el.dataset.id);
                break;
            case "moc1" :
            case "moc2" :
            case "moc3" :
            case "telya" :
            case "vetch1" :
            case "vetch2" :
                pizzaUser.topping = removeElement(pizzaUser.topping, el.dataset.id);
                break;
        }
        show(pizzaUser);
        if (e.target.tagName === "SPAN") {
            const [...imgArray] = document.getElementsByClassName("pizza_image");
            imgArray.reverse();

            const img = imgArray.find(img => img.dataset.id === el.dataset.id)
            img.remove();
        }
    }
}

function removeElement(array, value) {
    let index = array.findIndex(el => el.name === value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

const dragstart = (evt) => {
    console.log(evt.target.id)
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("Text", evt.target.id);
}

const dragover = (evt) => {
    if (evt.preventDefault) evt.preventDefault();
    return false;
}

const drop = (evt) => {
    console.log(151);
    if (evt.preventDefault) evt.preventDefault();
    if (evt.stopPropagation) evt.stopPropagation();

    let id = evt.dataTransfer.getData("Text");
    let addEl = document.getElementById(id);
    console.log(id);
    // const img = document.createElement("IMG")
    // img.classList.add("pizza_image")
    // img.setAttribute("src", addEl.src)
    // img.dataset.id = id
    //
    // table.appendChild(img)
    pizzaSelectTopping(addEl);

    return false;
}

const changePosition = (e) => {
    const main = document.querySelector("#main");
    const bannerEl = document.getElementById("banner");

    const mainHeightMax = Number(main.getBoundingClientRect().height)
    console.log(mainHeightMax);
    const mainWidthMax = Number(main.getBoundingClientRect().width)
    console.log(mainWidthMax);

    const bannerHeight = bannerEl.getBoundingClientRect().height
    const bannerWidth = bannerEl.getBoundingClientRect().width

    const randomHeight = Math.floor(Math.random() * ((mainHeightMax - bannerHeight) - 1 + 1) + 1);
    const randomWidth = Math.floor(Math.random() * ((mainWidthMax - bannerWidth) - 1 + 1) + 1);

    bannerEl.style.top = `${randomHeight}px`;
    bannerEl.style.left = `${randomWidth}px`;
    bannerEl.style.right = "unset"
    bannerEl.style.bottom = "unset"
}

const validate = (pattern, value) => pattern.test(value);

export {
    pizzaSelectSize,
    pizzaSelectTopping,
    pizzaDeleteTopping,
    show,
    validate,
    dragstart,
    dragover,
    drop,
    changePosition
}