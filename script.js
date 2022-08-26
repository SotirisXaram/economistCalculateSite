const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show_millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate_wealth");


let data = [];



async function getRandomUser() {
    const res = await fetch(`server.txt`);
    const data = await res.json();


    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1500000)
    };

    addData(newUser);

}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDom();
}

function showMillionaires() {
    data = data.filter((item) => {
        return item.money >= 500000
    })
    updateDom();

}


function addData(obj) {
    data.push(obj);

    updateDom();
}

function sortPeople() {
    data.sort((a, b) => {
        return b.money - a.money;
    })
    updateDom();


};

function calculateAllWealth() {
    const totalWealth = data.reduce((previousValue, CurrentValue) => previousValue + CurrentValue.money,0)
    const elem = document.createElement("div");
    elem.classList.add("totalWealth");
    elem.innerHTML = `<div>Total: </div> <div> ${formatMoney(totalWealth)}</div>`
    main.appendChild(elem)
    console.log(totalWealth);
}

function updateDom(providedData = data) {
    main.innerHTML = `<h2><strong>Person </strong>Wealth</h2>`;
    providedData.forEach(item => {
        const element = document.createElement(`div`);
        element.classList.add(`person`)
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    });
};

function formatMoney(number) {
    return `$ ` + number.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortPeople);
calculateWealthBtn.addEventListener("click", calculateAllWealth)