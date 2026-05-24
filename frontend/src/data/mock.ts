import type { Product, ProductVariant, SpecGroup } from '@/types';

type Locale = 'zh' | 'en';

interface L10n {
  zh: string;
  en: string;
}

interface RawVariant {
  skuId: string;
  color: L10n;
  size: string;
  price: number;
  stock: number;
  image: string;
}

interface RawSpec {
  name: L10n;
  key: 'color' | 'size';
  options: L10n[] | string[];
}

interface RawProduct {
  productId: string;
  name: L10n;
  description: L10n;
  images: string[];
  specs: RawSpec[];
  variants: RawVariant[];
}

function l(value: L10n, locale: Locale): string {
  return value[locale];
}

const RAW_PRODUCTS: Record<string, RawProduct> = {
  P001: {
    productId: 'P001',
    name: {
      zh: 'iPhone 15 Pro Max',
      en: 'iPhone 15 Pro Max',
    },
    description: {
      zh: 'iPhone 15 Pro Max 搭载 A17 Pro 芯片，配备钛金属外壳设计，支持 USB-C 接口。超视网膜 XDR 显示屏，ProMotion 自适应刷新率技术，支持常亮显示。专业级摄像系统包含 4800 万像素主摄、超广角和 5 倍光学变焦长焦镜头，带来卓越的摄影体验。',
      en: 'iPhone 15 Pro Max features the A17 Pro chip with a titanium design and USB-C connector. It has a Super Retina XDR display with ProMotion adaptive refresh rate and Always-On display. The pro camera system includes a 48MP main camera, ultra-wide, and 5x optical zoom telephoto lens for an exceptional photography experience.',
    },
    images: [
      'https://picsum.photos/seed/iphone-black/600/600',
      'https://picsum.photos/seed/iphone-white/600/600',
      'https://picsum.photos/seed/iphone-blue/600/600',
      'https://picsum.photos/seed/iphone-gold/600/600',
    ],
    specs: [
      {
        name: { zh: '颜色', en: 'Color' },
        key: 'color',
        options: [
          { zh: '原色钛金属', en: 'Natural Titanium' },
          { zh: '蓝色钛金属', en: 'Blue Titanium' },
          { zh: '白色钛金属', en: 'White Titanium' },
          { zh: '黑色钛金属', en: 'Black Titanium' },
        ],
      },
      {
        name: { zh: '存储容量', en: 'Storage' },
        key: 'size',
        options: ['256GB', '512GB', '1TB'],
      },
    ],
    variants: [
      { skuId: 'SKU-001', color: { zh: '原色钛金属', en: 'Natural Titanium' }, size: '256GB', price: 9999, stock: 15, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-002', color: { zh: '原色钛金属', en: 'Natural Titanium' }, size: '512GB', price: 11999, stock: 8, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-003', color: { zh: '原色钛金属', en: 'Natural Titanium' }, size: '1TB', price: 13999, stock: 3, image: 'https://picsum.photos/seed/iphone-gold/600/600' },
      { skuId: 'SKU-004', color: { zh: '蓝色钛金属', en: 'Blue Titanium' }, size: '256GB', price: 9999, stock: 20, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-005', color: { zh: '蓝色钛金属', en: 'Blue Titanium' }, size: '512GB', price: 11999, stock: 0, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-006', color: { zh: '蓝色钛金属', en: 'Blue Titanium' }, size: '1TB', price: 13999, stock: 5, image: 'https://picsum.photos/seed/iphone-blue/600/600' },
      { skuId: 'SKU-007', color: { zh: '白色钛金属', en: 'White Titanium' }, size: '256GB', price: 9999, stock: 12, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-008', color: { zh: '白色钛金属', en: 'White Titanium' }, size: '512GB', price: 11999, stock: 6, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-009', color: { zh: '白色钛金属', en: 'White Titanium' }, size: '1TB', price: 13999, stock: 0, image: 'https://picsum.photos/seed/iphone-white/600/600' },
      { skuId: 'SKU-010', color: { zh: '黑色钛金属', en: 'Black Titanium' }, size: '256GB', price: 9999, stock: 25, image: 'https://picsum.photos/seed/iphone-black/600/600' },
      { skuId: 'SKU-011', color: { zh: '黑色钛金属', en: 'Black Titanium' }, size: '512GB', price: 11999, stock: 10, image: 'https://picsum.photos/seed/iphone-black/600/600' },
      { skuId: 'SKU-012', color: { zh: '黑色钛金属', en: 'Black Titanium' }, size: '1TB', price: 13999, stock: 7, image: 'https://picsum.photos/seed/iphone-black/600/600' },
    ],
  },
};

const ERROR_MESSAGES = {
  productNotFound: { zh: '商品不存在', en: 'Product not found' },
  skuNotFound: { zh: 'SKU 不存在', en: 'SKU not found' },
  insufficientStock: { zh: '库存不足', en: 'Insufficient stock' },
  missingParams: { zh: '缺少必要参数', en: 'Missing required parameters' },
  invalidQuantity: { zh: '数量不能小于 1', en: 'Quantity must be at least 1' },
  badRequest: { zh: '请求格式错误', en: 'Bad request format' },
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;

export function getErrorMessage(key: ErrorKey, locale: Locale = 'zh'): string {
  return ERROR_MESSAGES[key][locale];
}

function resolveProduct(raw: RawProduct, locale: Locale): Product {
  return {
    productId: raw.productId,
    name: l(raw.name, locale),
    description: l(raw.description, locale),
    images: raw.images,
    specs: raw.specs.map((spec): SpecGroup => ({
      name: l(spec.name, locale),
      key: spec.key,
      options: spec.options.map((opt) =>
        typeof opt === 'string' ? opt : l(opt, locale),
      ),
    })),
    variants: raw.variants.map((v): ProductVariant => ({
      skuId: v.skuId,
      color: l(v.color, locale),
      size: v.size,
      price: v.price,
      stock: v.stock,
      image: v.image,
    })),
  };
}

let cartState = { count: 0 };

export function getMockProduct(productId: string, locale: Locale = 'zh'): Product | null {
  const raw = RAW_PRODUCTS[productId];
  if (!raw) return null;
  return resolveProduct(raw, locale);
}

export function getMockCartState() {
  return { ...cartState };
}

export function addToMockCart(
  productId: string,
  skuId: string,
  quantity: number,
  locale: Locale = 'zh',
): { success: boolean; cartCount: number; message?: string } {
  const raw = RAW_PRODUCTS[productId];
  if (!raw) {
    return { success: false, cartCount: cartState.count, message: getErrorMessage('productNotFound', locale) };
  }

  const variant = raw.variants.find((v) => v.skuId === skuId);
  if (!variant) {
    return { success: false, cartCount: cartState.count, message: getErrorMessage('skuNotFound', locale) };
  }

  if (variant.stock < quantity) {
    return { success: false, cartCount: cartState.count, message: getErrorMessage('insufficientStock', locale) };
  }

  variant.stock -= quantity;
  cartState.count += quantity;
  return { success: true, cartCount: cartState.count };
}
