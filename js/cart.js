import { ducks } from '../data/ducks.js';
import { loadCart, updateCartItem, removeFromCart } from './cart-storage.js';

const cartItems = document.getElementById('cart_items');
const cartTotal = document.getElementById('cart_total');

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + '€';
}

function resolveImgPath(src) {
    try {
        return new URL(src, window.location.href).href;

    } catch (e) {
        return src;
    }
}

function renderCart() {
  const cart = loadCart();
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    cartItems.innerHTML = '<li class="empty">Cart is empty!</li>';
    cartTotal.innerHTML = `<div class="total-row"><strong>Total:</strong> <span>0,00€</span></div>`;
    return;
  }

  cartItems.innerHTML = entries.map(([id, qty]) => {
    const duck = ducks.find(d => d.id === id);
    if (!duck) return '';
    const subtotal = duck.price * qty;
    const imgSrc = resolveImgPath(duck.img);
    return `
      <li class="cart-item" data-id="${id}">
        <img src="${imgSrc}" alt="${duck.alt}">
        <div class="cart-item-info">
          <h3>${duck.name}</h3>
          <p>${formatPrice(duck.price)} x ${qty}</p>
          <p>Subtotal: ${formatPrice(subtotal)}</p>
        </div>
        <div class="cart-item-actions">
          <button class="remove-item" data-id="${id}">Eliminar</button>
          <input type="number" min="1" value="${qty}" class="cart-qty" data-id="${id}">
        </div>
      </li>
    `;
  }).join('');

  const total = entries.reduce((sum, [id, qty]) => {
    const duck = ducks.find(d => d.id === id);
    return sum + (duck ? duck.price * qty : 0);
  }, 0);
  const subtotal = total;
  const shipping = subtotal === 0 ? 0 : (subtotal >= 50 ? 0 : 5.99);
  const taxRate = 0.10;
  const taxes = +(subtotal * taxRate).toFixed(2);
  const grandTotal = +(subtotal + shipping + taxes).toFixed(2);

  cartTotal.innerHTML = `
    <div class="order-summary">
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
      <div class="summary-row"><span>Estimated taxes</span><span>${formatPrice(taxes)}</span></div>
      <hr />
      <div class="summary-row total-row"><strong>Total</strong><strong>${formatPrice(grandTotal)}</strong></div>
      <button id="checkout">Checkout</button>
    </div>
  `;
}

document.addEventListener('click', event => {
  const removeBtn = event.target.closest('.remove-item');
  if (removeBtn) {
    removeFromCart(removeBtn.dataset.id);
    renderCart();
    return;
  }

  const checkoutBtn = event.target.closest('#checkout');
  if (checkoutBtn) {
    localStorage.removeItem('duckstore-cart');
    renderCart();
    alert('good buy, good bye!');
  }
});

document.addEventListener('change', event => {
  const qtyInput = event.target.closest('.cart-qty');
  if (qtyInput) {
    updateCartItem(qtyInput.dataset.id, Number(qtyInput.value));
    renderCart();
  }
});

renderCart();
