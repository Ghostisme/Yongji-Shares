'use client';

import { useState, useCallback, useEffect } from 'react';
import { cartService } from '@/services/api';

interface UseCartReturn {
  cartCount: number;
  adding: boolean;
  addToCart: (productId: string, skuId: string, quantity: number) => Promise<boolean>;
}

export function useCart(): UseCartReturn {
  const [cartCount, setCartCount] = useState(0);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    cartService.getCount().then((res) => {
      setCartCount(res.cartCount);
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  const addToCart = useCallback(
    async (productId: string, skuId: string, quantity: number): Promise<boolean> => {
      setAdding(true);

      try {
        const res = await cartService.add({ productId, skuId, quantity });

        if (res.success) {
          setCartCount(res.cartCount);
          return true;
        }

        throw new Error(res.message || '加入购物车失败');
      } finally {
        setAdding(false);
      }
    },
    []
  );

  return { cartCount, adding, addToCart };
}
