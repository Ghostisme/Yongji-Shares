'use client';

interface QuantityControlProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function QuantityControl({
  value,
  min = 1,
  max,
  onChange,
  disabled = false,
}: QuantityControlProps) {
  const canDecrease = value > min && !disabled;
  const canIncrease = value < max && !disabled;

  return (
    <div className="flex items-center">
      <span className="text-sm text-gray-500 mr-3">数量</span>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => canDecrease && onChange(value - 1)}
          disabled={!canDecrease}
          className={`
            w-10 h-10 flex items-center justify-center text-lg transition-colors
            ${canDecrease
              ? 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
              : 'text-gray-200 cursor-not-allowed'}
          `}
          aria-label="减少数量"
        >
          −
        </button>

        <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-gray-800 border-x border-gray-200 select-none">
          {value}
        </span>

        <button
          onClick={() => canIncrease && onChange(value + 1)}
          disabled={!canIncrease}
          className={`
            w-10 h-10 flex items-center justify-center text-lg transition-colors
            ${canIncrease
              ? 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
              : 'text-gray-200 cursor-not-allowed'}
          `}
          aria-label="增加数量"
        >
          +
        </button>
      </div>

      {max > 0 && (
        <span className="text-xs text-gray-400 ml-3">
          库存 {max} 件
        </span>
      )}
    </div>
  );
}
