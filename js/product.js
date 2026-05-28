import { ducks } from '../data/ducks.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const duck = ducks.find(d => d.id === id);

const container = document.getElementById('product-detail');

if (!duck) {
    container.innerHTML = `<p>Pato no encontrado. <a href="catalog.html">Volver </a></p>`;
} else {
    container.innerHTML =`
   <article class="product">
            <div class="product__image">
                <img src="${duck.img}" alt="${duck.alt}">
            </div>
            <div class="product__info">
                <h1 class="product__title">${duck.name}</h1>
                <p class="product__price">${duck.price.toFixed(2).replace('.', ',')}€</p>
                <p class="product__description">${duck.description}</p>
                <div class="add-row">
                    <select class="qty-select" id="qty" aria-label="Cantidad">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button class="add-to-cart" id="add-btn">Añadir al carrito</button>
                </div>
            </div>
        </article>
    ; `

document.getElementById('add-btn').addEventListener('click', () => {
    const quantity = Number(document.getElementById('qty').value);
    console.log(`Añadir ${quantity} de ${duck.id}`);
});

}
