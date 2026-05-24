export interface Messages {
  header: { title: string; cartLabel: string };
  product: { detailSection: string; sku: string };
  stock: { inStock: string; lowStock: string; outOfStock: string };
  quantity: { label: string; decrease: string; increase: string; stockCount: string };
  cart: { add: string; adding: string; outOfStock: string; successMessage: string; failMessage: string };
  error: { title: string; retry: string; productNotFound: string; loadFailed: string };
}

const zh: Messages = {
  header: {
    title: '商品详情',
    cartLabel: '购物车',
  },
  product: {
    detailSection: '商品详情',
    sku: 'SKU',
  },
  stock: {
    inStock: '有货',
    lowStock: '仅剩 {count} 件',
    outOfStock: '暂时缺货',
  },
  quantity: {
    label: '数量',
    decrease: '减少数量',
    increase: '增加数量',
    stockCount: '库存 {count} 件',
  },
  cart: {
    add: '加入购物车',
    adding: '正在添加...',
    outOfStock: '暂时缺货',
    successMessage: '已成功加入购物车',
    failMessage: '加入购物车失败，请重试',
  },
  error: {
    title: '加载失败',
    retry: '重新加载',
    productNotFound: '商品不存在',
    loadFailed: '加载商品信息失败',
  },
};

export default zh;
