export interface ProductVariant {
  skuId: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  specs: SpecGroup[];
}

export interface SpecGroup {
  name: string;
  key: keyof Pick<ProductVariant, 'color' | 'size'>;
  options: string[];
}

export interface CartItem {
  productId: string;
  skuId: string;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  cartCount: number;
  message?: string;
}

export interface ProductDetailResponse {
  success: boolean;
  data: Product;
  message?: string;
}
