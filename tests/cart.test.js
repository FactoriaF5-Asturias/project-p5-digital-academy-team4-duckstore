import { beforeEach, test, expect } from 'vitest';
import { loadCart, addToCart, updateCartItem, removeFromCart } from '../js/cart-storage.js'

global.localStorage = (() => {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; }
  };
})();

beforeEach(() => {
  localStorage.clear();
});

test('addToCart stores quantity', () => {
    addToCart('duck-classic', 2);
    expect(loadCart()).toEqual({ 'duck-classic': 2 });
});

test('addToCart stores quantity', () => {
    addToCart('duck-classic', 1);
    addToCart('duck-classic', 3);
    expect(loadCart() ['duck-classic']).toBe(4);
});

test('updateCartItem updates and removes when <= 0', () => {
    addToCart('duck-astro', 2);
    updateCartItem('duck-astro', 5);
    expect(loadCart()['duck-astro']).toBe(5);
    updateCartItem('duck-astro', 0);
    expect(loadCart()['duck-astro']).toBeUndefined();
});

test('removeFromCart deletes item', () => {
    addToCart('duck-evil', 1);
    removeFromCart('duck-evil');
    expect(loadCart()).toEqual({});
});