'use client';

import { useState, useCallback } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useCart } from '@/hooks/useCart';
import { showToast } from '@/components/ui/Toast';
import { ProductSkeleton } from '@/components/ui/Skeleton';
import { ErrorView } from '@/components/ui/ErrorView';
import { ProductImage } from './ProductImage';
import { VariantSelector } from './VariantSelector';
import { QuantityControl } from './QuantityControl';
import { StockBadge } from './StockBadge';
import { AddToCartButton } from './AddToCartButton';
import { CartIcon } from './CartIcon';

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { product, loading, error, selectedVariant, selectedSpecs, selectSpec, reload } =
    useProduct(productId);
  const { cartCount, adding, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : true;
  const maxQuantity = selectedVariant?.stock ?? 0;

  const handleAddToCart = useCallback(async () => {
    if (!product || !selectedVariant || outOfStock) return;

    try {
      const success = await addToCart(product.productId, selectedVariant.skuId, quantity);
      if (success) {
        showToast('已成功加入购物车', 'success');
        setQuantity(1);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '加入购物车失败，请重试';
      showToast(message, 'error');
    }
  }, [product, selectedVariant, outOfStock, quantity, addToCart]);

  const handleSpecChange = useCallback(
    (key: 'color' | 'size', value: string) => {
      selectSpec(key, value);
      setQuantity(1);
    },
    [selectSpec]
  );

  if (loading) return <ProductSkeleton />;
  if (error) return <ErrorView message={error} onRetry={reload} />;
  if (!product) return <ErrorView message="商品不存在" />;

  const displayPrice = selectedVariant?.price ?? product.variants[0]?.price ?? 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-800 truncate">商品详情</h1>
          <button className="p-2 -mr-2 hover:bg-gray-100 rounded-xl transition-colors" aria-label="购物车">
            <CartIcon count={cartCount} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImage
            images={product.images}
            activeImage={selectedVariant?.image}
            productName={product.name}
          />

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-red-500">
                ¥{displayPrice.toLocaleString()}
              </span>
              <StockBadge stock={selectedVariant?.stock ?? 0} />
            </div>

            {selectedVariant && (
              <p className="text-xs text-gray-400">SKU: {selectedVariant.skuId}</p>
            )}

            <hr className="border-gray-100" />

            <VariantSelector
              specs={product.specs}
              selectedSpecs={selectedSpecs}
              variants={product.variants}
              onSelect={handleSpecChange}
            />

            <hr className="border-gray-100" />

            <QuantityControl
              value={quantity}
              max={maxQuantity}
              onChange={setQuantity}
              disabled={outOfStock}
            />

            <div className="flex gap-3 mt-2">
              <AddToCartButton
                disabled={!selectedVariant}
                loading={adding}
                outOfStock={outOfStock}
                onClick={handleAddToCart}
              />
            </div>

            <div className="mt-4 pt-5 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">商品详情</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
