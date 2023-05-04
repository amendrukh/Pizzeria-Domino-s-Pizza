import {
    pizzaSelectSize,
    pizzaSelectTopping,
    pizzaDeleteTopping,
    show,
    validate,
    dragstart,
    dragover,
    drop,
    changePosition
} from "./functions.js";
import {pizzaUser} from "./data-pizza.js"

//const [...inputs] = document.querySelectorAll("#pizza input");
/*
inputs.forEach((input)=>{
    input.addEventListener("click", ()=>{
        console.log("+")
    })
})
*/

document.querySelectorAll(".grid input")
    .forEach((input) => {
        if (input.type === "text" || input.type === "tel" || input.type === "email") {
            input.addEventListener("change", () => {
                if (input.type === "text" && validate(/^[А-я-іїґє]{2,}$/i, input.value)) {
                    selectInput(input, pizzaUser)
                } else if (input.type === "tel" && validate(/^\+380\d{9}$/, input.value)) {
                    selectInput(input, pizzaUser)
                } else if (input.type === "email" && validate(/^[a-z0-9_.]{3,}@[a-z0-9._]{2,}\.[a-z.]{2,9}$/i, input.value)) {
                    selectInput(input, pizzaUser)
                } else {
                    input.classList.add("error")
                }
            })
        } else if (input.type === "reset") {
            input.addEventListener("click", () => {

            })
        } else if (input.type === "button") {
            input.addEventListener("click", () => {
                localStorage.userInfo = JSON.stringify(pizzaUser);
            })
        }
    })

function selectInput(input, data) {
    input.className = ""
    input.classList.add("success")
    data.userName = input.value
}

document.querySelector("#pizza")
    .addEventListener("click", pizzaSelectSize);

document.querySelector(".ingridients")
    .addEventListener("click", (e) => {
        pizzaSelectTopping(e.target)
    });

document.addEventListener("click", pizzaDeleteTopping);

document.querySelectorAll(".draggable").forEach((e) => {
    e.addEventListener('dragstart', dragstart);
});

document.querySelector(".table")
    .addEventListener("dragover", dragover);

document.querySelector(".table")
    .addEventListener("drop", drop);

document.querySelector("#banner")
    .addEventListener("mouseover", changePosition)

show(pizzaUser)


