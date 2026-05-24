import type { Product } from '@/types';

export const MOCK_PRODUCTS: Record<string, Product> = {
  P001: {
    productId: 'P001',
    name: 'iPhone 15 Pro Max',
    description:
      'iPhone 15 Pro Max 搭载 A17 Pro 芯片，配备钛金属外壳设计，支持 USB-C 接口。超视网膜 XDR 显示屏，ProMotion 自适应刷新率技术，支持常亮显示。专业级摄像系统包含 4800 万像素主摄、超广角和 5 倍光学变焦长焦镜头，带来卓越的摄影体验。',
    images: [
      'https://picsum.photos/seed/iphone-black/600/600',
      'https://picsum.photos/seed/iphone-white/600/600',
      'https://picsum.photos/seed/iphone-blue/600/600',
      'https://picsum.photos/seed/iphone-gold/600/600',
    ],
    specs: [
      {
        name: '颜色',
        key: 'color',
        options: ['原色钛金属', '蓝色钛金属', '白色钛金属', '黑色钛金属'],
      },
      {
        name: '存储容量',
        key: 'size',
        options: ['256GB', '512GB', '1TB'],
      },
    ],
    variants: [
      { skuId: 'SKU-001', color: '原色钛金属', size: '256GB', price: 9999, stock: 15, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-002', color: '原色钛金属', size: '512GB', price: 11999, stock: 8, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-003', color: '原色钛金属', size: '1TB', price: 13999, stock: 3, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-004', color: '蓝色钛金属', size: '256GB', price: 9999, stock: 20, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-005', color: '蓝色钛金属', size: '512GB', price: 11999, stock: 0, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-006', color: '蓝色钛金属', size: '1TB', price: 13999, stock: 5, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-007', color: '白色钛金属', size: '256GB', price: 9999, stock: 12, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-008', color: '白色钛金属', size: '512GB', price: 11999, stock: 6, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-009', color: '白色钛金属', size: '1TB', price: 13999, stock: 0, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-010', color: '黑色钛金属', size: '256GB', price: 9999, stock: 25, image: 'https://picsum.photos/seed/iphone-black/600/600' },
      { skuId: 'SKU-011', color: '黑色钛金属', size: '512GB', price: 11999, stock: 10, image: 'https://picsum.photos/seed/iphone-black/600/600' },
      { skuId: 'SKU-012', color: '黑色钛金属', size: '1TB', price: 13999, stock: 7, image: 'https://picsum.photos/seed/iphone-black/600/600' },
    ],
  },
};

let cartState = { count: 0 };

export function getMockProduct(productId: string): Product | null {
  return MOCK_PRODUCTS[productId] ?? null;
}

export function getMockCartState() {
  return { ...cartState };
}

export function addToMockCart(
  productId: string,
  skuId: string,
  quantity: number
): { success: boolean; cartCount: number; message?: string } {
  const product = MOCK_PRODUCTS[productId];
  if (!product) {
    return { success: false, cartCount: cartState.count, message: '商品不存在' };
  }

  const variant = product.variants.find((v) => v.skuId === skuId);
  if (!variant) {
    return { success: false, cartCount: cartState.count, message: 'SKU 不存在' };
  }

  if (variant.stock < quantity) {
    return { success: false, cartCount: cartState.count, message: '库存不足' };
  }

  variant.stock -= quantity;
  cartState.count += quantity;
  return { success: true, cartCount: cartState.count };
}
