let input = document.getElementById('input')
let amount = document.getElementById('amount')
let searchBtn = document.getElementsByClassName('search')
let addBtn = document.getElementsByClassName('add')
let result = document.getElementById('result')
let cancelBtn = document.getElementById('cancel')
let litres = document.getElementById('litres')
let price = document.getElementById('price')
let priceResult = document.getElementById('priceResult')

let storage = JSON.parse(localStorage.getItem("products")) == null ? [] : JSON.parse(localStorage.getItem("products"));
let id = JSON.parse(localStorage.getItem("id")) == null ? 0 : JSON.parse(localStorage.getItem("id"));
let sum = JSON.parse(localStorage.getItem("sum")) == null ? 0 : JSON.parse(localStorage.getItem("sum"));
updateItems()

function sumAll() {
    let ar = []
    let sumElem = 0
    let items = storage
    items.forEach(el => ar.push(el.sumEl));
    for (let i in ar) {
        sumElem += ar[i]
    }
    priceResult.innerHTML = 'Сума : ' + sumElem.toFixed(2)
}

function clearStorage() {
    let ask = window.confirm("Ви дійсно хочете видалити усі дані?")
    if (ask) {
        let password = prompt('Введіть пароль')
        if (password == 1111) {
            localStorage.clear()
            alert('Дані успішно видалено,обновіть сторінку!')
        } else alert('Неправильний пароль!')
    }
}

function sumElement() {
    inputSum = price.value * amount.value;
}

function add() {
    sumElement()
    storage.push({
        name: input.value, litres: litres.value, amount: amount.value,
        id: ++id, price: price.value, sumEl: inputSum
    });
    updateItems();
}

function search() {
    cancelBtn.style.display = ''
    addBtn[0].style.display = 'none'
    updateItems(storage.filter(x => x.name.includes(input.value)));
}

function cancel() {
    addBtn[0].style.display = ''
    cancelBtn.style.display = 'none'
    updateItems()
}

function deleteItem(id) {
    let ask = window.confirm("Ви дійсно хочете видалити продукт?")
    if (ask) {
        let password = prompt('Введіть пароль')
        if (password == 1111) {
            storage = storage.filter(x => x.id !== id);
        } else alert('Неправильний пароль!')
    }
    updateItems()
}

function edit(id) {
    document.getElementById(`saveButton${id}`).style.display = ''
    document.getElementById(`edit${id}`).style.display = 'none'
    let text = document.getElementById(`name-column${id}`);
    let amountNum = document.getElementById(`amount-column${id}`);
    let productPrice = document.getElementById(`price-column${id}`);
    let elem = storage.find(x => x.id == id);
    text.innerHTML = "<input class= editInpt id =text-input" + id + " type='text' value='" + elem.name + "'>";
    amountNum.innerHTML = "<input class= editInpt id =amount-input" + id + " type='text' value='" + elem.amount + "'>";
    productPrice.innerHTML = "<input class= editInpt id =price-input" + id + " type='text' value='" + elem.price + "'>";
}



function save(id) {
    let elem = storage.find(x => x.id == id);
    userText = document.getElementById(`text-input${id}`).value;
    amountOfProduct = document.getElementById(`amount-input${id}`).value;
    productPrice = document.getElementById(`price-input${id}`).value;
    elem.name = userText;
    elem.amount = amountOfProduct;
    elem.price = productPrice
    elem.sumEl = amountOfProduct * productPrice;
    updateItems();
}

function updateItems(items = storage) {
    if (items == null) {
        return
    }
    let html = '<tr>';
    html += '<th>Назва</th>';
    html += '<th>Ємкість</th>';
    html += "<th>Кількість</th>"
    html += "<th>Ціна</th>"
    html += "<th>Сума</th>"
    html += '</tr>';
    items.forEach(elem => {
        html += `<tr id ="${elem.id}">`;
        html += `<td id = name-column${elem.id}> ${elem.name}</td>` +
            `<td id = name-column${elem.id}> ${elem.litres}</td>` +
            `<td id = amount-column${elem.id}> ${elem.amount}</td>` +
            `<td id = price-column${elem.id}> ${elem.price}</td>` +
            `<td id = sum-column${elem.id}> ${elem.sumEl.toFixed(2)}</td>` +
            `<td id = edit> <button class=editBtn onclick="edit(${elem.id})" id="edit${elem.id}" >редагувати</button></td>`
            + `<td id = deleteItem> <button class=deleteBtn  onclick="deleteItem(${elem.id})" id="deleteItem${elem.id}" >Видалити</button></td>`
        html += `<td><button class=saveBtn  id = saveButton${elem.id} style="display:none" onclick="save(${elem.id})">Зберегти</button></td>`
        html += '</tr>';
    })
    localStorage.setItem("products", JSON.stringify(storage));
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("sum", JSON.stringify(sum));
    sumAll()
    result.innerHTML = html;
}




