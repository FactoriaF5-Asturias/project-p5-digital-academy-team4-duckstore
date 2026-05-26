import { ducks } from '../data/ducks.js';

const catalogoContainer = document.getElementById('catalogo');
const filterButtons = document.querySelectorAll('.filters__btn');

function renderCatalog(category) {
    let filtered;

    if (category === 'all') {
        filtered = ducks;
    } else {
        filtered = ducks.filter(duck => duck.category === category);
    }

    const cards = filtered.map(duck => `
        <article class="patos" data-id="${duck.id}">
            <img src="${duck.img}" alt="${duck.alt}">
            <div class="info">
                <h2 class="titulo">${duck.name}</h2>
                <p class="descripcion">${duck.description}</p>
                <span class="precio">${duck.price.toFixed(2).replace('.', ',')}€</span>
                <button class="add-to-cart" data-id="${duck.id}">Añadir al carrito</button>
            </div>
        </article>
    `);

    catalogoContainer.innerHTML = cards.join('');
}

// Render inicial: todos los patos
renderCatalog('all');

// Conectar cada botón de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        renderCatalog(category);

        // Marcar el botón pulsado como activo
        filterButtons.forEach(b => b.classList.remove('is-active'));
        button.classList.add('is-active');
    });
});
