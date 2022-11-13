"use strict";

const basket = {};
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotalValue');
const basketTotalDivEl = document.querySelector('.basketTotal');

document.querySelector('.cartIconWrap').
addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});

document.querySelector('.featuredItems').
addEventListener('click', function (event) {
    if (!event.target.closest('.addToCart')) {
        return 0;
    }
    const product = event.target.closest('.featuredItem');
    const id = +product.dataset.id;
    const name = product.dataset.name;
    const price = +product.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: +id,
            name: name,
            price: +price,
            count: 0,
        };
    }
    basket[id].count++;
    basketTotalEl.textContent=getTotalPrice().toFixed(2).toString();
    basketCounterEl.textContent=getBasketCounter().toString();
    addToRow(id);
}

function getTotalPrice(){
    return Object.values(basket)
        .reduce((acc, prev) => (acc + prev.price * prev.count), 0);

}

function getBasketCounter(){
    return Object.values(basket)
        .reduce((acc, prev) => (acc + prev.count), 0);
}

function addToRow(id) {
    const isRow=basketEl
        .querySelector(`[data-rowId="${id}"]`);
    if (!isRow){
        newRow(id);
        return 0;
    }
    isRow.querySelector('.productCount')
        .textContent=basket[id].count;
    isRow.querySelector('.productTotal')
        .textContent=(basket[id].price * basket[id].count).toString();
}

function newRow(id){
    const row=`
        <div class="basketRow" data-rowId="${id}">
            <div class="productName">${basket[id].name}</div>
            <div>
                <span class="productCount">${basket[id].count}</span>
                шт.
            </div>
            <div class="productPrice">$${basket[id].price}</div>
            <div>
            $
            <span class="productTotal">
                ${basket[id].price * basket[id].count}
            </span>
            </div>
        </div>
    `;
    basketTotalDivEl
        .insertAdjacentHTML('beforebegin', row);
}


