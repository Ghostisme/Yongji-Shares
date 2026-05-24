'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, ProductVariant } from '@/types';
import { productService } from '@/services/api';

interface SelectedSpecs {
  color: string;
  size: string;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedVariant: ProductVariant | null;
  selectedSpecs: SelectedSpecs;
  selectSpec: (key: keyof SelectedSpecs, value: string) => void;
  reload: () => void;
}

export function useProduct(productId: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpecs, setSelectedSpecs] = useState<SelectedSpecs>({
    color: '',
    size: '',
  });

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await productService.getDetail(productId);
      const data = res.data;
      setProduct(data);

      if (data.variants.length > 0) {
        const first = data.variants.find((v) => v.stock > 0) ?? data.variants[0];
        setSelectedSpecs({ color: first.color, size: first.size });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载商品信息失败';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const selectSpec = useCallback(
    (key: keyof SelectedSpecs, value: string) => {
      setSelectedSpecs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find(
        (v) => v.color === selectedSpecs.color && v.size === selectedSpecs.size
      ) ?? null
    );
  }, [product, selectedSpecs]);

  return {
    product,
    loading,
    error,
    selectedVariant,
    selectedSpecs,
    selectSpec,
    reload: fetchProduct,
  };
}
