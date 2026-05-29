export const CART_KEY = 'duckstore-cart';

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(id, quantity = 1) {
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + quantity;
  saveCart(cart);
}

export function updateCartItem(id, quantity) {
  const cart = loadCart();
  if (quantity <= 0) {
    delete cart[id];
  } else {
    cart[id] = quantity;
  }
  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = loadCart();
  delete cart[id];
  saveCart(cart);
}
