import {ducks} from '../data/ducks.js';
const catalogoContainer = document.getElementById('catalogo');
<article class="patos" data-id="${duck.id}">
<div class="info">
    <h2 class="titulo">${ducks.name}</h2>
    <p class="descipcion">${ducks.description}</p>
    <span class="precio">${duck.price.toFixed(2).replace('.', ','){duck.price.toFixed(2).replace('.', ',')}€</span>
    <button class="add-to-cart" data-id="${duck.id}">Añadir al carrito</button>

</div>

</article>>