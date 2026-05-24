'use client';

import type { SpecGroup, ProductVariant } from '@/types';

interface VariantSelectorProps {
  specs: SpecGroup[];
  selectedSpecs: { color: string; size: string };
  variants: ProductVariant[];
  onSelect: (key: 'color' | 'size', value: string) => void;
}

function isOptionAvailable(
  variants: ProductVariant[],
  selectedSpecs: { color: string; size: string },
  specKey: string,
  optionValue: string
): boolean {
  return variants.some((v) => {
    const matchesCurrent = v[specKey as keyof ProductVariant] === optionValue;
    const matchesOther = Object.entries(selectedSpecs).every(([key, val]) => {
      if (key === specKey) return true;
      return v[key as keyof ProductVariant] === val;
    });
    return matchesCurrent && matchesOther && v.stock > 0;
  });
}

export function VariantSelector({
  specs,
  selectedSpecs,
  variants,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-5">
      {specs.map((spec) => (
        <div key={spec.key}>
          <h3 className="text-sm font-medium text-gray-500 mb-2.5">
            {spec.name}：
            <span className="text-gray-900 font-semibold ml-1">{selectedSpecs[spec.key]}</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {spec.options.map((option) => {
              const isSelected = selectedSpecs[spec.key] === option;
              const available = isOptionAvailable(variants, selectedSpecs, spec.key, option);

              return (
                <button
                  key={option}
                  disabled={!available}
                  onClick={() => onSelect(spec.key, option)}
                  className={`
                    px-4 py-2 text-sm rounded-full border transition-all font-medium
                    ${isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25'
                      : available
                        ? 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through'}
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
