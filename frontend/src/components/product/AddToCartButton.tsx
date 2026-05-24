'use client';

import { useI18n } from '@/i18n';

interface AddToCartButtonProps {
  disabled: boolean;
  loading: boolean;
  outOfStock: boolean;
  onClick: () => void;
}

export function AddToCartButton({
  disabled,
  loading,
  outOfStock,
  onClick,
}: AddToCartButtonProps) {
  const { t } = useI18n();
  const isDisabled = disabled || loading || outOfStock;

  const label = outOfStock
    ? t('cart.outOfStock')
    : loading
      ? t('cart.adding')
      : t('cart.add');

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex-1 h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2
        ${isDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-sm shadow-blue-600/25'}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      )}
      {label}
    </button>
  );
}
