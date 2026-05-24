import type { ProductDetailResponse, AddToCartResponse, CartItem } from '@/types';

const API_BASE = '/api';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || '请求失败，请稍后重试', response.status);
  }

  return data as T;
}

export const productService = {
  getDetail(productId: string) {
    return request<ProductDetailResponse>(`/product/${productId}`);
  },
};

export const cartService = {
  add(item: CartItem) {
    return request<AddToCartResponse>('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  getCount() {
    return request<{ success: boolean; cartCount: number }>('/cart');
  },
};
