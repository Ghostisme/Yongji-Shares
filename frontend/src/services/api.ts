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

async function request<T>(
  url: string,
  options?: RequestInit & { locale?: string },
): Promise<T> {
  const { locale, ...init } = options ?? {};
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(locale ? { 'Accept-Language': locale } : {}),
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...init,
    headers: { ...headers, ...(init.headers as Record<string, string> | undefined) },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || 'Request failed', response.status);
  }

  return data as T;
}

export const productService = {
  getDetail(productId: string, locale?: string) {
    return request<ProductDetailResponse>(`/product/${productId}`, { locale });
  },
};

export const cartService = {
  add(item: CartItem, locale?: string) {
    return request<AddToCartResponse>('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      locale,
    });
  },

  getCount() {
    return request<{ success: boolean; cartCount: number }>('/cart');
  },
};
