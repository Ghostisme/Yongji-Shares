import type { Messages } from './zh';

const en: Messages = {
  header: {
    title: 'Product Detail',
    cartLabel: 'Cart',
  },
  product: {
    detailSection: 'Product Details',
    sku: 'SKU',
  },
  stock: {
    inStock: 'In Stock',
    lowStock: 'Only {count} left',
    outOfStock: 'Out of Stock',
  },
  quantity: {
    label: 'Quantity',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    stockCount: '{count} in stock',
  },
  cart: {
    add: 'Add to Cart',
    adding: 'Adding...',
    outOfStock: 'Out of Stock',
    successMessage: 'Successfully added to cart',
    failMessage: 'Failed to add to cart, please retry',
  },
  error: {
    title: 'Failed to Load',
    retry: 'Reload',
    productNotFound: 'Product not found',
    loadFailed: 'Failed to load product information',
  },
} as const;

export default en;
