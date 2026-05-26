import {ducks} from '../data/ducks.js';

const catalogoContainer = document.getElementById('catalogo');
const fitlerButtons = document.querySelectorAll('.fitlers__btn');

const cards = ducks.map(duck =>`
<article class="patos" data-id="${duck.id}">
    <img src="${duck.img}" alt="${duck.alt}">
<div class="info">
    <h2 class="titulo">${duck.name}</h2>
    <p class="descripcion">${duck.description}</p>
    <span class="precio">${duck.price.toFixed(2).replace('.', ',')}€</span>
    <button class="add-to-cart" data-id="${duck.id}">Añadir al carrito</button>
    </div>
</article>

  `)

  function renderCatalog(category) {
  let filtered;

  if (category === 'all'){
    filtered= ducks;
  } else {
    filtered = ducks.filter(duck => duck.category === category)
  }
  }
renderCatalog('all')
catalogoContainer.innerHTML = cards.join('')
catalogoContainer.innerHTML = renderCatalog.join('')